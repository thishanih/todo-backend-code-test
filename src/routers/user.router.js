import express from "express";
import { userRegister } from "../services/user.service.js";

const userRouter = express.Router();

//////////////////  Register a Staff /////////////
userRouter.post("/addUser", async (req, res, next) => {
  try {
    const result = await userRegister(req.body);
    res.status(200).json({
      message: "Successfully created the member",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export default userRouter;
