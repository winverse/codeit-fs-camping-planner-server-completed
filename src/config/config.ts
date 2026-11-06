import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().min(1),
  DATABASE_URL: z.string().min(1),
  GOCAMPING_SERVICE_KEY: z.string().min(1),
  CORS_ORIGINS: z.string().optional().default(""),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL,
      GOCAMPING_SERVICE_KEY: process.env.GOCAMPING_SERVICE_KEY,
      CORS_ORIGINS: process.env.CORS_ORIGINS,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = z.flattenError(error);
      console.error("환경 변수 검증 실패:", fieldErrors);
    }
    process.exit(1);
  }
};

export const config = parseEnvironment();

export const isProduction = config.NODE_ENV === "production";

export const corsOrigins = config.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
