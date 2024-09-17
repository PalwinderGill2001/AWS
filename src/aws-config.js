import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  region: 'us-east-1', // Change to your region
  credentials: new AWS.Credentials('YOUR_ACCESS_KEY_ID', 'YOUR_SECRET_ACCESS_KEY')
});

export const rekognition = new AWS.Rekognition();
