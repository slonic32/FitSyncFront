jest.mock('react-modal', () => ({
    default: (props) => <div>{props.children}</div>, 
    
    setAppElement: () => null, 
  }));
  
  import { TextEncoder, TextDecoder } from 'util';
  
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;