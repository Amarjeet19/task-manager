const express=require('express')
const Task=require('../models/task')
const router =new express.Router()

router.get('/try',(req,res)=>{
    res.send("we are sending the data")
})

//CREATE TASK

router.post('/task', async (req, res) => {
    // console.log(req.body);
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(error)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
    // res.send("Testing")
})

//FIND TASK
router.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.find({}).then((task) => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

//UPDATE TASK
router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['desc', 'comp']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Operation" })
    }
    try {

        const task=await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()

        //find,replace,option to get validated
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//DELETE TASK
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id,)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports=router