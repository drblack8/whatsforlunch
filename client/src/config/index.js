export const configuration = {
    environment: process.env.NODE_ENV || 'development',
    aws: {
        accessKey: process.env.REACT_APP_ACCESS_KEY_ID,
        secretKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    }
  };

