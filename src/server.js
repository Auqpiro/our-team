import express from "express";
import * as dotenv from 'dotenv';
import loger from "morgan";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(loger('tiny'));
app.get('/*', (_, res) => {
  res.send('Server is running');
});
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
