// the things are similar in both mongoose and mongodb 
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task_manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify:false,
    useCreateIndex: true,//help to fetch data form the database
})





// const task=new Task({
//     desc:'      Going to market',
// })

// task.save().then(()=>{
// console.log(task);
// }).catch((error)=>{
//     console.log(error);
// })

// create the instance of model 
// const me=new User({
//     name:'  Rohit   ',
//     email:"Ros@gmail.com"`1
// })

// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
// console.log('Error ',error);
// })