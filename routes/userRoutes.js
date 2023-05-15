import express from "express";
import { 
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login
} from "../controllers/UsersController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", login);

router.route("/:idUser")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default router;