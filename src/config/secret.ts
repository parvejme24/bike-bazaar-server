export const secretConfig = {
  mongoDbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nu02d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
