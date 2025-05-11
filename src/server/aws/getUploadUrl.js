import dotenv from 'dotenv';
dotenv.config();

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export async function getUploadUrl(filename, contentType) {
  const timestamp = Date.now();
  const key = `uploads/${timestamp}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: 'cyber4pros-assets',
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return {
    uploadUrl,
    publicUrl: `https://d38vexjll1ow2m.cloudfront.net/${key}`
  };
}
