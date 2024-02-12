const Crudmodel = require('../Model/Crudmodel')

const Createcrud = async (req, res) => {
    const { Name, Skills } = req.body
    try {
        const task = await Crudmodel.create({ Name, Skills })
        res.status(200).json({ success: true })
    } catch (er) {
        res.status(400).json({ success: false })
    }
}
const Getcrud = async (req, res) => {
    try {
        const task = await Crudmodel.find({})
        res.status(200).json(task)
    } catch (er) {
        res.status(400).json({ success: false })
    }
}
const Getcrudid = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Crudmodel.find({ _id: id })
        res.status(200).json(task)
    } catch (er) {
        res.status(400).json({ success: false })
    }
}
const Updatecrud = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Crudmodel.updateOne({ _id: id }, { ...req.body })
        res.status(200).json(task)
    } catch (er) {
        res.status(400).json({ success: false })
    }
}
const Deletecrud = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Crudmodel.findByIdAndDelete({ _id: id })
        res.status(200).json(task)
    } catch (er) {
        res.status(400).json({ success: false })
    }
}
module.exports = { Createcrud, Getcrud, Getcrudid, Updatecrud, Deletecrud }