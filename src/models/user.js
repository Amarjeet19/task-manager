// the things are similar in both mongoose and mongodb 
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//so is we want the middleware to work we keep the object in the schema and pass it to the mongoose model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        //custom validator 
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postitive number')
            }
        }
    },
    email: {
        type: String,
        unique: true,//this is to make sure that the email is unique not repeated
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is in valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (value === 'password') {
                throw new Error('Invalid Password!!!')
            }
            if (value.length <= 6) {
                throw new Error("Short Password")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

//isntance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens=user.tokens.concat({token:token}) //the token is saved for user and it will be be in daatbase 
    await user.save()//after that the token is saved with user
    return token
}





// for the whole User (model methos)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    // console.log("we are logging in");
    // console.log(user);
    if (!user) {
        // console.log("not matched");
        // use throw to sent the error not throw new error
        throw ("Unable to login")
    }
    // console.log("user-pass ",user.password);
    // console.log(await bcrypt.hash(password,8));
    const isMatch = await bcrypt.compareSync(password, user.password);
    // if(!isMatch){
    //     throw ("Unable to login wrong password")
    // }


    // console.log("before returning");
    // console.log(user);
    return user
}




//hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    // isModified to check if the field is modified or not 
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }

    console.log('just before saving');

    next() //is the function which is called after the function of save is fully executed if not called it will hang
})

//creating the model
const User = mongoose.model('User', userSchema)

module.exports = User