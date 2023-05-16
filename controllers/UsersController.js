import {Users} from "../models/user.js";
import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT.js";

const getUsers =async (req, res) => {
    try {
        const users = await Users.findAll();
        return res.json(users);
    } catch (error) {
        console.log("🚀 ~ file: UsersController.js:8 ~ getUsers ~ error:", error)
    }
}

const getUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        const user = await Users.findByPk(idUser);
        if (!user) {
            const error = new Error("User not found");
            return res.status(404).json({mensaje: error.message});
        }
        return res.json(user);
    } catch (error) {
        console.log("🚀 ~ file: UsersController.js:22 ~ getUser ~ error:", error)
    }
}

const addUser= async (req, res) => {
    const {email, password,name, lastName} = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let newPasword = bcrypt.hashSync(password, salt);
    try {
        const newUser = await Users.create({email, password:newPasword, name, lastName});
        return res.json({...newUser, status: 200});
    } catch (error) {
        console.log("🚀 ~ file: UsersController.js:36 ~ addUser ~ error:", error)
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        const user = await Users.findByPk(idUser);
        if (!user) {
            const error = new Error("User not found");
            return res.status(404).json({mensaje: error.message});
        }
        let newPasword = user.password;
        if (req.body?.password != undefined || req.body?.password != null) {
            const salt = await bcrypt.genSalt(10);
            newPasword =await bcrypt.hash(user.password, salt);
        }

        user.name = user.name || req.body.name;
        user.lastName = user.lastName ||req.body.lastName;
        user.email = user.email || req.body.email;
        user.password = newPasword
        const userUpdated = await user.save();
        res.json(userUpdated);
    } catch (error) {
        console.log("🚀 ~ file: UsersController.js:59 ~ updateUser ~ error:", error)
    }
}

const deleteUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        const user = await Users.findByPk(idUser);
        if (!user) {
            const error = new Error("User not found");
            return res.status(404).json({mensaje: error.message});
        }
        await user.destroy();
        return res.json(user);
    } catch (error) {
        console.log("🚀 ~ file: UsersController.js:76 ~ deleteUser ~ error:", error)
    }
}

const comprobarPassword = async (password, passwordForm) => {
    return await bcrypt.compare(passwordForm, password)
}


const login =async (req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({where:{email: email}});
    if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({msg: error.message})
    }
    if (await comprobarPassword(user.password, password)) {
        return res.status(200).json({
            status: 200,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            token: generateJWT(user.idUser)
        });
    }
    else{
        const error = new Error("El Password es Incorrecto");
        return res.status(403).json({msg: error.message})
    }
}

export {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login
}