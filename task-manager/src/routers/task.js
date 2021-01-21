const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=(true/false)
// GET /tasks?limit=(10)&skip=(0)
// GET /tasks?sortBy=createdAt:(asc/desc)
router.get('/tasks', auth, async (req, res) => {
    // filter parameter
    const match = {}
    // sort parameter
    const sort = {}
    
    if (req.query.completed) {
        // casts true/false string value of req.query.completed to boolean and assigns to match.completed
        match.completed = (req.query.completed === 'true')
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        // parts[0] = field to sort by
        // parts[1] = asc/desc
        // sets sort value to -1 if query parameter is set to desc, 1 if asc/anything else
        sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1)
    }
    
    try {
        await req.user.populate({
            // path specifies field on User for which we want to get data
            path: 'tasks',
            // specifies matching parameter for path. Shorthand notation for match: {}
            match,
            options: {
                //Mongoose knows to ignore this field if it's not passed a number, so default limit will essentially be 0
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                //Shorthand notation for sort : {} using sort variabe from above
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router