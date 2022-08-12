import express from 'express';
import cors from 'cors';
import {cursosRoutes} from './routes/course.js';

const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message:'Hola Mundo!', 
    status: 'OK'})
})

app.use(cursosRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})