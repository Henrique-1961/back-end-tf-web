import { Router } from "express";
import jwt from "jsonwebtoken";
import { autenticarAluno } from "../db/aluno.js";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const aluno = await autenticarAluno(req.body.email, req.body.senha);
        const assistente = await autenticarAssistente(req.body.email, req.body.senha);
        
        if (aluno !== undefined) 
        {
            const token = jwt.sign({ user: aluno.id, type: "aluno" }, process.env.SECRET, {
                expiresIn: 300*12,
            });

            res.status(202).json({ token: token });
        }

        else if (assistente !== undefined)
        {
            const token = jwt.sign({ user: assistente.id, type: "assistente" }, process.env.SECRET, {
                expiresIn: 300*12,
            });

            res.status(202).json({ token: token });
        }
        
        else {
            res.status(404).json({ message: "Usuário ou senha incorretos!" });
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;