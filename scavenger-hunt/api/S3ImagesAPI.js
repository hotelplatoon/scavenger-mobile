import { Constants } from 'expo';

var AWS = require('aws-sdk');

AWS.config.update(
  {
    accessKeyId: Constants.manifest.extra.S3_API_KEY_ID,
    secretAccessKey: Constants.manifest.extra.S3_SECRET_ACCESS_KEY,
    region: 'us-east-2',
  }
);

var s3 = new AWS.S3();




export default {
  s3: s3,
}
