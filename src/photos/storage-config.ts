import path from "path";

const StorageConfig = {
  keyFilename: path.join(__dirname, "../../googleBucketKey.json"),
  projectId: process.env.GOOGLE_BUCKET_PROJECT_ID,
};

export default StorageConfig;
