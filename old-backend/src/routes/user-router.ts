import express from "express";
import { createUser, loginUser } from "../controller/user-controller";

const router = express.Router();

router.post("/user", createUser as express.RequestHandler);
router.post("/login", loginUser as express.RequestHandler);

export default router;
