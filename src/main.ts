import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

config();

(async function start() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle("BREENKY")
    .setDescription("REST API")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
})();
