const express=require('express')

const userController=require('../Controllers/userController')
const studentController=require('../Controllers/studentController')

const jwtMiddle=require('../Middleware/jwtMiddleware')
const multerMiddle=require('../Middleware/multerConfig')


const route=express.Router()

route.post('/reg',userController.userRegistration)
route.post('/log',userController.userLogin)
route.post('/addstudent',jwtMiddle,multerMiddle.single("image"),studentController.addStudents)
route.get('/getstudents',jwtMiddle,studentController.getStudents)
route.delete('/deletestudent/:sid',jwtMiddle,studentController.deleteStudent)
route.put('/updatestudent/:sid',jwtMiddle,multerMiddle.single("image"),studentController.updateStudent)


module.exports=route