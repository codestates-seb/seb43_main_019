import express from "express";
import { home, searchLink } from "../../controllers/videoControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
