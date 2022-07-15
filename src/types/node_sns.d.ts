namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    NODE_SNS_PORT: string;
    NODE_SNS_DATABASE_URL: string;
    NODE_SNS_ACCESS_SECRET: string;
    NODE_SNS_REFRESH_SECRET: string;
    NODE_SNS_COOKIE_SECRET: string;
    NODE_SNS_SESSION_SECRET;
  }
}

namespace Express {
  interface User {
    id: string;
  }
}
