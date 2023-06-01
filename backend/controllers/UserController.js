import User from "../models/UserModel.js"

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = async (req, res) => {
  try {
    const users = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).json({ msg: "User created" })
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ msg: "User updated" })
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ msg: "User deleted" })
  } catch (error) {
    console.log(error)
  }
}