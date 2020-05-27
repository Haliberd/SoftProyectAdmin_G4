const express = require("express")
const courses = express.Router()

const courseController = require("../controllers/CoursesController.js")

const cors = require("cors")

courses.use(cors())

//Crear curso
courses.post('/create', courseController.create)

//Borrar curso, se recibe el id para borrar la tupla
courses.delete('/delete/:id', courseController.delete)

//Editar curso, se recibe el id para editar el curso
courses.post('/update/:id', courseController.update)

//Listar cursos existentes de la BD
courses.get('/readAll', courseController.readAll)

module.exports = courses;