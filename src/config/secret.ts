export const secretConfig = {
  mongoDbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nu02d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  jwtSecret: process.env.JWT_SECRET,
};
