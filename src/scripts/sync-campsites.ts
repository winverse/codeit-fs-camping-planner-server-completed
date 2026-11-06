import "reflect-metadata";
import { PrismaService } from "#prisma/db.js";
import { CampsiteService } from "#services";
import { setupContainer } from "../common/di/container.js";

const container = setupContainer();
const campsiteService = container.resolve(CampsiteService);

try {
  const count = await campsiteService.syncCampsites();
  console.log(`저장한 캠핑장 ${count}개`);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`동기화에 실패했습니다: ${error.message}`);
  }
  process.exitCode = 1;
}

await container.resolve(PrismaService).db.close();
