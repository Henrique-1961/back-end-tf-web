import { Router } from "express";

import {
    selectSignatures,
    selectSignature,
    insertSignature,
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
        const id = await insertSignature(req.body);
        if (id === undefined) throw Error("Erro ao cadastrar a assinatura");
        res.status(201).json({ id: id });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.patch("/assinatura", verificarAutenticacao, async (req, res) => {
    try {
        const signature = await selectSignature(req.body.id);

        if (signature.length > 0) {
            const res = await updateSignature(req.body);
            if (!res) throw Error("Erro ao atualizar a assinatura.");
            res.status(200).json({ message: "Assinatura atualizada com sucesso!" });
        } else res.status(404).json({ message: "Assinatura não encontrada!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;