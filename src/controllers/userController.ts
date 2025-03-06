import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur.model";

export async function createUser(req: Request, res: Response) {
    try {
        // Validation des champs
        const { nom, email } = req.body;
        const utilisateur = await Utilisateur.create({ nom, email });
        res.json(utilisateur);
    } catch (err: any) {
        // Gestion des erreurs
        res.status(500).json({ message: 'Erreur interne', error: err.message });

    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const utilisateurs = await Utilisateur.findAll();
        res.send(utilisateurs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function modifyUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nom, email } = req.body;

        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return
        }

        // Mise à jour des champs fournis
        if (nom) utilisateur.nom = nom;
        if (email) utilisateur.email = email;

        await utilisateur.save();
        res.status(200).json({ message: "Utilisateur modifié avec succès", utilisateur });
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return
        }

        await utilisateur.destroy();
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}