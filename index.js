import express from 'express';
import cors from 'cors';
import {cursosRoutes} from './routes/course.js';
import {userCoursesTrackRoutes} from './routes/userCoursesTrack.js';

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message:'Hola Mundo!', 
    status: 'OK'})
})

app.use(cursosRoutes);
app.use(userCoursesTrackRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
