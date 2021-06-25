const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/test', (req, res) => {
    res.send("from a new file")
})

//CREATION
router.post('/users', async (req, res) => {
    // console.log(req.body);
    const user = new User(req.body)
    console.log(user);
    try {
        await user.save()
        const token=await user.generateAuthToken()
        // console.log(user);
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(200).send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
    // res.send("Testing")
})

router.post('/users/login', async (req, res) => {
    try {
        //user defined function so in model use as statisc
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // token is generated for the unique user      
        const token=await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

//READ
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

// dynamic parameter 
router.get('/users/:id', async (req, res) => {
    //req.params contains the dict passed in the url
    const _id = req.params.id  //fetching the id from the dict

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.findById(_id).then((user) => {
    //     // if no value is returned then also it is returned true in mongoose so write some if and else if 
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)

    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

//UPDATE USER SET
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Operation" })
    }
    try {

        const user = await User.findByIdAndUpdate(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()
        //find,replace,option to get validated
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


//DELETE USER
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id,)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})





module.exports = router