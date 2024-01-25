import { Router } from "express";

import {
    selectAssistentes,
    selectAssistente,
    insertAssistente,
    deleteAssistente,
    updateAssistente
  } from "../db/assistente.js";
  
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.get("/assistente", verificarAutenticacao, async (req, res) => {
    try {
        const assistentes = await selectAssistentes();
        res.json(assistentes);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/assistente/:id", verificarAutenticacao, async (req, res) => {
    try {
        const assistente = await selectAssistente(req.params.id);
        if (assistente.length > 0) res.json(assistente);
        else res.status(404).json({ message: "Assistente não encontrado!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.post("/assistente", verificarAutenticacao, async (req, res) => {
    try {
        await insertAssistente(req.body);
        res.status(201).json({ message: "Assistente inserido com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/assistente/:id", verificarAutenticacao, async (req, res) => {
    try {
        await deleteAssistente(req.params.id);
        res.status(204).json({ message: "Assistente excluído com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.patch("/assistente:id", verificarAutenticacao, async (req, res) => {
    try {
        const assistente = await selectAssistente(req.params.id);

        if (assistente.length > 0) {
            await updateAssistente(req.body);
            res.status(200).json({ message: "Assistente atualizado com sucesso!" });
        } else res.status(404).json({ message: "Assistente não encontrado!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;