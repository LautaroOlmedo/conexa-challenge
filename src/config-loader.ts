export const configLoader = () => {
  return {
    port: process.env.PORT,
    database: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
    },
  };
};
