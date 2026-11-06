import "reflect-metadata";
import { config } from "#config";
import { App } from "./app.js";
import { setupContainer } from "./common/di/container.js";

async function bootstrap() {
  const container = setupContainer();
  const app = container.resolve(App);
  await app.listen(config.PORT);
}

bootstrap().catch((error) => {
  console.error("애플리케이션 시작 실패:", error);
  process.exitCode = 1;
});
