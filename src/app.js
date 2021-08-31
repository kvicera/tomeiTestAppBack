const path = require('path')
const fs = require('fs')
const express = require('express')

const router = express.Router();
const app = express()

const helmet = require('helmet');
app.use(helmet());

const logger = require('morgan');
app.use(logger('dev'));

// log all requests to access.log
app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRouter = require('./user')
router.use('/', userRouter)

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is up on port 3000.')
})
