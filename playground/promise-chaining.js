require('../src/db/mongoose')
const User = require('../src/models/user')

//606efb68a05c881de0cd4faf
// find by id and update the age 
// User.findByIdAndUpdate('606f016a76af7627ac765879', { age: 1 }).then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age: age })
    return count
}

updateAgeAndCount('606f016a76af7627ac765879', 2).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})