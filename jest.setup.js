jest.mock('react-modal', () => ({
    default: (props) => <div>{props.children}</div>, 
    
    setAppElement: () => null, 
  }));

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn(),
    }),
  })),
  HarmBlockThreshold: {},
  HarmCategory: {},
}));
  
  import { TextEncoder, TextDecoder } from 'util';
  
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;