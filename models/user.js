import {sequelize}  from "../db/database.js";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
    idUSer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps:false});