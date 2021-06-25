const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouteruser = require('./routers/user')
const userRoutertask = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json()) // if the data is json it is just going  to parse the data for us
app.use(userRouteruser)
app.use(userRoutertask)


app.listen(port, () => {
    console.log("Server is up on the port " + port);
})

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const my_functionjwt = async () => {
    const token = jwt.sign({ _id: "abc" }, 'thisismynewcourse', { expiresIn: '7 days' })
    //the thing need for the authentication,any series of character for matching,dict for fiff parameter
    //it expire after 7 days so the verify will execute after 7 days
    console.log(token);
    //  for the token created the string combined for checking is imp 
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data);
}

const my_functionbcrypt = async () => {
    //hashing one way algorithm
    //and the encryption algorithm is 2 way algorithm
    const password = 'Read1387e9'
    const hashedPassword = await bcrypt.hash(password, 8)// password,no of  times to hash
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('Read1387e9', hashedPassword)
    console.log(isMatch);
}

my_functionjwt()