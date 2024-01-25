import dotenv from "dotenv";
dotenv.config();

import express from "express";
import alunoRouter from "./routes/aluno.js";
import signatureRouter from "./routes/signature.js";
import loginRouter from "./routes/login.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(alunoRouter);
app.use(signatureRouter);
app.use(loginRouter);

app.get("*", (req, res) => {        
    res.json({
        message: "Trabalho Final #05: https://github.com/Henrique-1961/back-end-tf-web",
    });
});

app.listen(port, () => {
    console.log(`App listening: http://localhost:${port}`);
});