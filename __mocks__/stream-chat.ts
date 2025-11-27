export class StreamChat {
  private apiKey: string;
  private apiSecret: string;

  private constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  static getInstance(apiKey: string, apiSecret: string) {
    return new StreamChat(apiKey, apiSecret);
  }

  tokenManager = {
    createToken: jest.fn(() => "mocked-stream-token"),
  };

  user = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  channel = {
    create: jest.fn(),
    sendMessage: jest.fn(),
  };
}
