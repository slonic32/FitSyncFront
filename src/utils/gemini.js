import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Hardcoded Gemini API key (replaced env variable)
const apiKey = 'AIzaSyAnMllaN9e2JfR5p6iRwWBVIE0T0q0QCJY';

if (!apiKey) {
  // Intentionally not throwing to avoid crashing UI; surface readable error instead
  // Consumers should check for missing key via getGeminiClient
}

let cachedClient = null;
const MODEL_CANDIDATES = [
  // Prefer latest Gen-2 models first
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-latest',
  'gemini-2.0-flash-lite',
  'gemini-2.0-pro',
  'gemini-2.0-pro-exp-02-05',
  // Fall back to 1.5 if 2.x unavailable
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
];

const DEFAULT_SAFETY = [
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY, threshold: HarmBlockThreshold.BLOCK_NONE },
];

export function getGeminiClient() {
  if (cachedClient) return cachedClient;
  if (!apiKey) return null;
  cachedClient = new GoogleGenerativeAI(apiKey);
  return cachedClient;
}

export function getHealthModel(modelName = MODEL_CANDIDATES[0]) {
  const client = getGeminiClient();
  if (!client) return null;
  return client.getGenerativeModel({ model: modelName });
}

async function generateWithFallbacks(contents, options = {}) {
  // Try known model aliases in order; if a model 404s, fall back to the next
  for (const name of MODEL_CANDIDATES) {
    try {
      const model = getHealthModel(name);
      const request = { contents, ...options };
      if (!request.safetySettings) request.safetySettings = DEFAULT_SAFETY;
      try {
        const res = await model.generateContent(request);
        return res;
      } catch (inner) {
        const innerMsg = String(inner?.error?.message || inner?.message || inner);
        if (/safety_settings|predicate failed|element predicate failed|invalid/i.test(innerMsg)) {
          // Retry without safety settings for this model
          const res = await model.generateContent({ contents });
          return res;
        }
        throw inner;
      }
    } catch (err) {
      const msg = String(err?.error?.message || err?.message || err);
      if (/not found|404|is not supported/i.test(msg)) {
        // continue to next model
        continue;
      }
      throw err;
    }
  }
  // If all failed with 404, throw the last error shape
  throw new Error('All Gemini model candidates unavailable for generateContent.');
}

export async function analyzeMealWithImage({ file, userContext }) {
  const model = getHealthModel();
  if (!model) {
    return { error: 'Missing Gemini API key. Please configure the API key in gemini.js' };
  }

  try {
    if (file?.size && file.size > 20 * 1024 * 1024) {
      return { error: 'Image is too large (>20MB). Please upload a smaller photo.' };
    }
    const imagePart = await fileToGenerativePart(file);

    const systemPrompt = `You are a health guide. Analyze meals from photos.
Return:
- Estimated total calories
- Exercise needed to burn those calories (walking, running, cycling), with durations for an average adult
- Macronutrients: protein, carbs, fats (grams)
- Vitamins/minerals likely present
- Hydration guidance: suggested water intake with electrolytes note if relevant
Be concise with bullet points and short explanations.
If uncertain, state assumptions.`;

    const userPrompt = userContext ? `User context: ${userContext}` : '';

    const result = await generateWithFallbacks(
      [
        {
          role: 'user',
          parts: [
            { text: systemPrompt },
            { text: userPrompt },
            imagePart,
          ],
        },
      ],
      {}
    );

    const text = result?.response?.text?.();
    return { text: text || 'No response' };
  } catch (err) {
    console.error('Gemini image analyze error', err);
    const message = normalizeGeminiError(err);
    return { error: message };
  }
}

export async function chatHealthGuide(messages) {
  const model = getHealthModel();
  if (!model) return { error: 'Missing VITE_GEMINI_API_KEY. Add it to your .env.' };

  try {
    const result = await generateWithFallbacks(messages);
    const text = result?.response?.text?.();
    return { text: text || 'No response' };
  } catch (err) {
    console.error('Gemini chat error', err);
    const message = normalizeGeminiError(err);
    return { error: message };
  }
}

async function fileToGenerativePart(file) {
  const base64 = await readFileAsDataURL(file).then(url => url.split(',')[1] || '');
  return {
    inlineData: {
      data: base64,
      mimeType: file.type || 'image/jpeg',
    },
  };
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function normalizeGeminiError(err) {
  try {
    // Prefer API error messages if present
    const apiMsg = err?.error?.message || err?.response?.error?.message;
    if (apiMsg) return apiMsg;
  } catch { }
  const text = String(err?.message || err);
  return `Gemini error: ${text}`;
}


