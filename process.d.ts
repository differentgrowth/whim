declare namespace NodeJS {
  export interface ProcessEnv {
    AUTH_SECRET: string;
    POSTGRES_DATABASE: string;
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PRISMA_URL: string;
    POSTGRES_URL: string;
    POSTGRES_URL_NON_POOLING: string;
    POSTGRES_USER: string;
  }
}