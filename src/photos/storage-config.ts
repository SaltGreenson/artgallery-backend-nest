import * as path from "path";
import * as process from "process";

const StorageConfig = {
  keyFilename: path.join(__dirname, "../../googleBucketKey.json"),
  projectId: process.env.GOOGLE_BUCKET_PROJECT_ID,
  bucketName: process.env.GOOGLE_BUCKET_NAME,
};

export default StorageConfig;
