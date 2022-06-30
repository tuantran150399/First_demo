import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserbyId,
  updateUser,
  deleteUser,
} from "../controllers/usersController";

const userRoutes = Router();

userRoutes.get("/getUsers", getUsers);

userRoutes.get("/getUserbyId", getUserbyId);
userRoutes.post("/create", createUser);

userRoutes.get("/delete/:id", deleteUser);

userRoutes.post("/edit/:id", updateUser);
// router.get("/edit/:id", renderEditForm);
export default userRoutes;
