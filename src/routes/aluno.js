import { Router } from "express";

import {
    selectAlunos,
    selectAluno,
    insertAluno,
    deleteAluno,
    updateAluno
  } from "../db/aluno.js";
  
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.get("/aluno", verificarAutenticacao, async (req, res) => {
    try {
        const alunos = await selectAlunos();
        res.json(alunos);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/aluno/:id", verificarAutenticacao, async (req, res) => {
    try {
        const aluno = await selectAluno(req.params.id);
        if (aluno.length > 0) res.json(aluno);
        else res.status(404).json({ message: "Aluno não encontrado!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.post("/aluno", verificarAutenticacao, async (req, res) => {
    try {
        await insertAluno(req.body);
        res.status(201).json({ message: "Aluno inserido com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/aluno/:id", verificarAutenticacao, async (req, res) => {
    try {
        await deleteAluno(req.params.id);
        res.status(204).json({ message: "Aluno excluído com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.patch("/aluno", verificarAutenticacao, async (req, res) => {
    try {
        const aluno = await selectAluno(req.body.id);

        if (aluno.length > 0) {
            await updateAluno(req.body);
            res.status(200).json({ message: "Aluno atualizado com sucesso!" });
        } else res.status(404).json({ message: "Aluno não encontrado!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;