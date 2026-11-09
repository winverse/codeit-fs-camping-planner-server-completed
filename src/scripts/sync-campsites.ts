import { createContainer } from '../common/di/container.js';

const { campsiteService, db } = createContainer();

try {
  const count = await campsiteService.syncCampsites();
  console.log(`저장한 캠핑장 ${count}개`);
} catch (error) {
  if (error instanceof Error) {
    console.error(`동기화에 실패했습니다: ${error.message}`);
  }
  process.exitCode = 1;
}

await db.close();
