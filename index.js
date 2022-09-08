import express from 'express';
import cors from 'cors';
import { cursosRoutes } from './routes/courses.js';
import { cursoRoutes } from './routes/userCourse.js';
import { userCoursesTrackRoutes } from './routes/userCoursesTrack.js';
import { courseCreate } from './routes/courseCreate.js';
import { userProfileRoutes } from './routes/userProfile.js';
import { userRoutes } from './routes/userRole.js';
import { courseStatus } from './routes/courseStatus.js';
import { userTrack } from './routes/userTrack.js';
import { courseContentCreate } from './routes/courseContent.js';
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc';

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'This is API for Open-Door',
    status: 'OK'
  })
})

app.use(cursosRoutes);
app.use(userCoursesTrackRoutes);
app.use(cursoRoutes);
app.use(courseCreate);
app.use(userProfileRoutes);
app.use(userRoutes);
app.use(courseStatus);
app.use(userTrack);
app.use(courseContentCreate);

const swaggerSpec = {
  definition: {
    components: {},
    openapi: '3.0.0',
    info: {
      title: 'OPEN DOOR - API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://back-open-door-int.vercel./',
      },
    ],
  },
  apis: ['./routes/*.js']
};

//middleware
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerjsdoc(swaggerSpec))
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
