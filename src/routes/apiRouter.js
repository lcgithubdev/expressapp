import { Router } from "express";

import ApiController from "../controllers/ApiController.js";

const apiController = new ApiController();

const apiRouter = new Router();

//apiRouter.get('/createtable', apiController?.createTable);

//apiRouter.get('/droptable', apiController?.dropTable);

export default apiRouter