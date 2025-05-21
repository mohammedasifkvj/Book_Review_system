import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();


const port=process.env.PORT || 8000;

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => res.send("server is ready"))

app.listen(port, () => {
  console.log(`Server listening http://127.0.0.1:${port}`);
});