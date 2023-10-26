import { Router } from "express";

import {
    selectSignatures,
    selectSignature,
    insertSignature,
    deleteSignature,
    updateSignature
  } from "../db/vai_volta.js";
  
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.get("/assinatura", verificarAutenticacao, async (req, res) => {
    try {
        const signature = await selectSignatures();
        res.json(signature);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/assinatura/:id", verificarAutenticacao, async (req, res) => {
    try {
        const signature = await selectSignature(req.params.id);
        if (signature.length > 0) res.json(signature);
        else res.status(404).json({ message: "Assinatura não encontrada!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.post("/assinatura", verificarAutenticacao, async (req, res) => {
    try {
        await insertSignature(req.body);
        res.status(201).json({ message: "Assinatura inserida com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/assinatura/:id", verificarAutenticacao, async (req, res) => {
    try {
        await deleteSignature(req.params.id);
        res.status(204).json({ message: "Assinatura excluída com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.patch("/assinatura", verificarAutenticacao, async (req, res) => {
    try {
        const signature = await selectSignature(req.body.id);

        if (signature.length > 0) {
            await updateSignature(req.body);
            res.status(200).json({ message: "Assinatura atualizada com sucesso!" });
        } else res.status(404).json({ message: "Assinatura não encontrada!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;