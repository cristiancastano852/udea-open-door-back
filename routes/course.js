import express from 'express';

const cursosRoutes = express.Router();

cursosRoutes.route('/courses').get((req, res) => {
    res.status(200).json({
        cursos:[
            "Curso 1",
            "Curso 2",
            "Curso 3",
        ], 
        status: 'OK'})
});

export {cursosRoutes};