import { Router } from "express";

import vaiVolta from "../db/vai_volta.js";
import saida from "../db/saida.js";
import pernoite from "../db/pernoite.js";
  
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.get("/assinatura/:lista", verificarAutenticacao, async (req, res) => {
    try {
        let signature;

        switch (req.params.lista) {
            case "vai_volta":
                signature = await vaiVolta.selectSignatures();
                res.json(signature);
                return;

            case "saida":
                signature = await saida.selectSignatures();
                res.json(signature);
                return;
                
            case "pernoite":
                signature = await pernoite.selectSignatures();
                res.json(signature);
                return;
        }
        
        throw Error("lista não reconhecida");
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/assinatura/:lista/:id", verificarAutenticacao, async (req, res) => {
    try {
        let signature;

        switch (req.params.lista) {
            case "vai_volta":
                signature = await vaiVolta.selectSignature(req.params.id);
                if (signature.length > 0) res.json(signature);
                else res.status(404).json({ message: "Assinatura não encontrada!" });
                return;
                
            case "saida":
                signature = await saida.selectSignature(req.params.id);
                if (signature.length > 0) res.json(signature);
                else res.status(404).json({ message: "Assinatura não encontrada!" });
                return;
                
            case "pernoite":
                signature = await pernoite.selectSignature(req.params.id);
                if (signature.length > 0) res.json(signature);
                else res.status(404).json({ message: "Assinatura não encontrada!" });
                return;
        }
        
        throw Error("lista não reconhecida");
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.post("/assinatura/:lista", verificarAutenticacao, async (req, res) => {
    try {
        let id;

        switch (req.params.lista) {
            case "vai_volta":
                id = await vaiVolta.insertSignature(req.body);
                if (id === undefined) throw Error("Erro ao cadastrar a assinatura");
                res.status(201).json({ id: id });
                return;
                
            case "saida":
                id = await saida.insertSignature(req.body);
                if (id === undefined) throw Error("Erro ao cadastrar a assinatura");
                res.status(201).json({ id: id });
                return;
                
            case "pernoite":
                id = await pernoite.insertSignature(req.body);
                if (id === undefined) throw Error("Erro ao cadastrar a assinatura");
                res.status(201).json({ id: id });
                return;
        }
        
        throw Error("lista não reconhecida");
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.patch("/assinatura/:lista/:id", verificarAutenticacao, async (req, res) => {
    try {
        let signature;

        switch (req.params.lista) {
            case "vai_volta":
                signature = await vaiVolta.selectSignature(req.params.id);

                if (signature.length > 0) {
                    const res = await vaiVolta.updateSignature(req.params.id, req.body);
                    if (!res) throw Error("Erro ao atualizar a assinatura.");
                    res.status(200).json({ message: "Assinatura atualizada com sucesso!" });
                } else res.status(404).json({ message: "Assinatura não encontrada!" });
                return;
                
            case "saida":
                signature = await daida.selectSignature(req.params.id);

                if (signature.length > 0) {
                    const res = await saida.updateSignature(req.params.id, req.body);
                    if (!res) throw Error("Erro ao atualizar a assinatura.");
                    res.status(200).json({ message: "Assinatura atualizada com sucesso!" });
                } else res.status(404).json({ message: "Assinatura não encontrada!" });
                return;
                
            case "pernoite":
                signature = await pernoite.selectSignature(req.params.id);

                if (signature.length > 0) {
                    const res = await pernoite.updateSignature(req.params.id, req.body);
                    if (!res) throw Error("Erro ao atualizar a assinatura.");
                    res.status(200).json({ message: "Assinatura atualizada com sucesso!" });
                } else res.status(404).json({ message: "Assinatura não encontrada!" });
                return;
        }
        
        throw Error("lista não reconhecida");
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/assinatura/:lista/:id", verificarAutenticacao, async (req, res) => {
    try {
        switch (req.params.lista) {
            case "vai_volta":
                await vaiVolta.deleteSignature(req.params.id);
                res.status(200).json({ message: "Assinatura excluída com sucesso" });
                return;
                
            case "saida":
                await saida.deleteSignature(req.params.id);
                res.status(200).json({ message: "Assinatura excluída com sucesso" });
                return;
                
            case "pernoite":
                await pernoite.deleteSignature(req.params.id);
                res.status(200).json({ message: "Assinatura excluída com sucesso" });
                return;
        }
    }

    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
})

export default router;