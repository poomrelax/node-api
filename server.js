const express = require('express')
const app = express()
const db = require('./db.json')
const infor = require('./information.json')
const cors = require('cors')
const bodyparser = require('body-parser')

app.use(cors())

app.use(bodyparser.json())


app.get('/video', (req, res) => {
  res.json(db)
})
app.get('/infor', (req, res) => {
  res.json(infor)
})

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

app.post('/user', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const mockusernames = "poomrelax"
  const mockpasswords = "11699"

  if(username == mockusernames && password == mockpasswords) {
    res.json({
      success: true,
      message: "login successful",
      token: "newusername"
    })
  }else{
    res.json({
      success: false,
      message: "login failed",
      token:"kuyyyy"
    })
  }
})

app.listen(2553, () => {
  console.log('Start server at port 2553.')
})

module.exports = app