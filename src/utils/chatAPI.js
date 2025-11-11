import axios from "axios";
import { BACKEND_HOST } from "../config/backend";

axios.defaults.baseURL = BACKEND_HOST + "/api/";

export async function chatHealthGuide(messages) {
  try {
    const { data } = await axios.post("/chat/chat", { messages });
    return data;
  } catch (e) {
    throw new Error(e?.response?.data?.error || e.message);
  }
}

export async function analyzeMealWithImage({ file, userContext }) {
  try {
    const form = new FormData();
    form.append("file", file);
    if (userContext) form.append("userContext", userContext);

    const { data } = await axios.post("/chat/analyze", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (e) {
    throw new Error(e?.response?.data?.error || e.message);
  }
}
