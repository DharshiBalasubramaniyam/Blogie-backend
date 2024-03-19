const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log("Failed to find all users: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
    
}

exports.getUserById = async (req, res) => {
    const { id } = req.params

    console.log(id)

    try {
        const existingUser = await User.findOne({_id: id})

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with id " + id })
        }
        res.send(existingUser)
    }catch (error) {
        console.log("Failed to find user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.addUser = async (req, res) => {
    const {email } = req.body;

    try {

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists with email " + email })
        }

        await User.create(req.body)

        res.status(201).json({ message: "User has been successfully added!" })

    } catch (error) {
        console.log("Failed to add user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params

    try {
        const existingUser = await User.findOne({ _id: id })

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with id " + id })
        }

        await User.updateOne({ _id: id }, { $set: req.body })
        res.status(200).json({ message: "User has been successfully updated!" })

    } catch (error) {
        console.log("Failed to update user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const existingUser = await User.findOne({ _id: id })

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with id " + id })
        }

        await User.deleteOne({ _id: id })
        res.status(200).json({ message: "User has been successfully deleted!" })

    }catch (error) {
        console.log("Failed to delete user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}