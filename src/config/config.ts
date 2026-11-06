import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1),
  DATABASE_URL: z.string().min(1),
  GOCAMPING_SERVICE_KEY: z.string().min(1),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL,
      GOCAMPING_SERVICE_KEY: process.env.GOCAMPING_SERVICE_KEY,
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
