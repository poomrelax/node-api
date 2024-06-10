const express = require('express')
const app = express()
const db = require('./db.json')
const infor = require('./information.json')
const cors = require('cors')
const mongoose = require('mongoose')
const homework = require('./homework')
const loginhomework = require('./homeworkloginmongo')
require('dotenv').config()
// const{TodoistApi} = require('@doist/todoist-api-typescript')
// const api = new TodoistApi(process.env.API_KEY);



// const collection = require('./homework')
const bodyparser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(bodyparser.json())  

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/video', (req, res) => {
  res.json(db)
})
app.get('/infor', (req, res) => {
  res.json(infor)
})

app.get('/homework', (req, res, next) => {
  homework.find((err, work) => {
    if(err) return next(err);
    res.json(work)
    // res.json(homework)
  })
})

app.post('/homework', async (req, res, next) => {
  homework.create(req.body, (err, post) => {
    if (err) return next(err)
      res.json(post)
  })
})

app.delete('/homework/:id', (req, res) => {
  homework.findByIdAndDelete(req.params.id, (err, post) => {
    res.json(post)
  })
})

app.post('/loginhomework', async (req, res) => {
  const {username, password} = req.body
  // const user = {
  //   "username" : username,
  //   "password" : password
  // }
  // res.json(user)
  // console.log(user)
  loginhomework.findOne({username: username})
    .then(user => {
      if(user) {
        if(user.password === password) {
          res.json({
            "Status" : "Success",
            "username" : user.username
          })
          console.log("Login Success")
        }else{
          res.json({
            "Status" : "password is incorrect"
          })
          console.log("the password is incorrect.")
        }
      }else{
        res.json({
          "Status" : "no_username"
        })
          console.log("no username")
      }
    })
})

app.post('/createloginhomework', async (req, res, next) => {
  loginhomework.create(req.body, (err, post) => {
    if (err) return next(err)
      res.json(post)
  })
})

// async function getuserprojects() {
//   try{
//     const projects = await api.getProjects();
//     return projects;
//   }catch(err) {
//     console.log(err)
//   }
// } 

// async function getTasks(projectsId) {
//   try{
//     const tasks = await api.getTasks({projectsId})
//     return tasks
//   }catch(err) {
//     console.log(err)
//   }
// }

// (async() => {
//   const projects = await getuserprojects()
//   console.log(projects)

//   const tasks = await getTasks(projects[0].id);
//   console.log(tasks)
// })()

// app.get('/homework', async (req, res) => {
 
// async function getuserprojects() {
//   try{
//     const projects = await api.getProjects();
//     return projects;
//   }catch(err) {
//     console.log(err)
//   }
// } 

// async function GetTasks(projectsId) {
//   try{
//     const tasks = await api.getTasks({projectsId})
//     return tasks
//   }catch(err) {
//     console.log(err)
//   }
// }

// (async() => {
//   const projects = await getuserprojects()
//   console.log(projects)

//   const tasks = await GetTasks(projects[0].id);
//   console.log(tasks)
//   res.json(tasks)
// })()
// })

// app.delete('/homework', async (req, res) => {
//   async function CloseHomework(id) {
//     try{
//       const success = true
//       const closehomework = await api.closeTask(id)
//       return success
//     }catch(err) {
//       console.log(err)
//     }
//   }

//   if(CloseHomework === true) {
//     CloseHomework(req.body.id)
//     res.json({
//       Status : 200,
//       message : "close success"
//     })
//   }else{
//     // res.sendStatus(400);
//     res.json({
//       Status : 400,
//       message : "nooooo"
//     })
//   }
// })

// app.post('/user', async (req, res) => {
//   const {username, password} = req.body

//   try{
//     const check = await collection.findOne({username:username})

//     if(check) {
//       res.json("exist")
//       return;
//     }else{
//       res.json("notexist")
//     }


//   }catch(e) {
//     console.log(e)
//   }
// })

  // const mockdata = [
  //   {
  //     username: "poomrelax",
  //     password: "11699"
  //   },
  
  //   {
  //     username: "To",
  //     password: "303"
  //   }
  // ]







app.listen(2553, () => {
  console.log('Start server at port 2553.')
})

module.exports = app