import express from "express";

import * as dotenv from "dotenv";

dotenv.config();

import apiRouter from "./routes/apiRouter.js";

const PORT = process.env.PORT || 3000

const app = express();

app.set('trust proxy', 1);

app.disable('x-powered-by');

app.use(express.json({ limit: '25mb' }));

app.use(express.urlencoded({ limit: '25mb', extended: false }));

app.get("/", (req, res) => res.json({ error: false, data: "home!" }));

app.get("/api", (req, res) => res.json({ error: false, data: "Api home!" }));

app.get("/api/v1", (req, res) => res.json({ error: false, data: "Api v1 home!" }));

app.use('/api/v1/', apiRouter);

app.all("*", (req, res) => res.json({ error: true, status: 404, data: "Api route not found!" }));

app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`); });

export default app

