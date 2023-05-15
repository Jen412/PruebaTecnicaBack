import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {sequelize} from "./db/database.js";
import userRoutes from "./routes/userRoutes.js";
import carsRoutes from "./routes/carsRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();

app.use(express.json())
dotenv.config();

const whitelist= [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        //console.log("🚀 ~ file: index.js:23 ~ origin", origin)
        if (whitelist.includes(origin)) {
            callback(null, true);
        }
        else{
            callback(new Error("Error de cors con origen "+ origin))
        }
    }
}
app.use(cors(corsOptions));

const port = process.env.PORT || 4500;

app.use('/api/users', userRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/clients', clientRoutes);

app.listen(port, async()=>{
    try {
        await sequelize.sync({force: false});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log("Run Server at port 4500")
})