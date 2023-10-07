import express from "express";

export const serverInit = () => {
  const app = express();

  app.listen(process.env.port, () => {
    console.log(`Server is running on http://localhost:${process.env.port}`);
  });
};
