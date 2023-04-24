import * as path from "path";
import * as process from "process";
import { config } from "dotenv";

config();

const StorageConfig = {
  keyFilename: path.join(__dirname, "../../googleBucketKey.json"),
  projectId: process.env.GOOGLE_BUCKET_PROJECT_ID,
  bucketName: process.env.GOOGLE_BUCKET_NAME || "artfalleryt",
};

export default StorageConfig;
