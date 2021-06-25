require('../src/db/mongoose')
const Task = require('../src/models/task')
const User=require('../src/models/task')


// Task.findByIdAndDelete('606efd4dd1c34e0bc4e22796').then((user)=>{
// console.log(user);
//     return Task.countDocuments({comp:false})
// }).then((count)=>{
//     console.log(count);
// }).catch((error)=>{
// console.log(error);
// })


const FindAndDelete=async (id)=>{
const deleted=await Task.findByIdAndDelete(id)
const count=await Task.countDocuments({comp:false})
return count
}

FindAndDelete('606f30074c0728373c8f8f43').then((count)=>{
console.log(count);
}).catch((error)=>{
    console.log(error);
})