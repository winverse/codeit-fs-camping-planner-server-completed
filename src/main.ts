import { config } from '#config';
import { App } from './app.js';
import { createContainer } from './common/di/container.js';

async function bootstrap() {
  const { controller } = createContainer();

  const app = new App(controller);
  await app.listen(config.PORT);
}

bootstrap().catch((error) => {
  console.error('애플리케이션 시작 실패:', error);
  process.exitCode = 1;
});
