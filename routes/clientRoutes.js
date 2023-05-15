import express from "express";
import { getClients } from "../controllers/ClientesController.js";

const router = express.Router();

router.get('/', getClients);

export default router;