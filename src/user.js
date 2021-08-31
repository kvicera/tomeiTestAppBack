const express = require('express')
const router = express.Router()

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  res.send(req.file)
})

router.post('/form/sendData', (req, res) => {
  const mariadb = require('mariadb')
  const pool = mariadb.createPool({
    //sorry i didnt bother to make it a secret
    //also, i forgot to use sequelize
    host: '127.0.0.1',
    user: 'usernameGoesHere',
    database: 'testapptomei',
    password: 'passwordGoesHere',
    connectionLimit: 5
  })
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query('SELECT 1 as val')
        .then(() => {
          return conn.query('INSERT INTO userdata(username, email, password, avatar) VALUES (?, ?, ?, ?)', [
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.avatar
          ])
        })
        .then((response) => {
          res.send(response)
          conn.end()
        })
        .catch((err) => {
          //handle error
          console.log(err)
          res.sendStatus(500)
          conn.end()
        })
    })
    .catch((err) => {
      //not connected
      res.sendStatus(500)
    })
})

module.exports = router
