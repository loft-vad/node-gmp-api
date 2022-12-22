declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      DB_PORT?: number;
      DB_USER: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}

export {};
