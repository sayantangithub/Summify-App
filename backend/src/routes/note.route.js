import express from "express";
import NoteController from "../controllers/note.controller.js";

export const noteRouter = express.Router();

const noteController = new NoteController();

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new secret note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: Lion is the King
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

noteRouter.post("/", (req, res) => {
  noteController.addNote(req, res);
});

/**
 * @swagger
 * /api/notes/{id}:
 *   post:
 *     summary: Unlock a secret note using password
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: Abc123!
 *     responses:
 *       200:
 *         description: Note unlocked successfully
 *       400:
 *         description: Password required
 *       401:
 *         description: Invalid password
 *       404:
 *         description: Note not found
 */

noteRouter.post("/:id", (req, res) => {
  noteController.unlockNote(req, res);
});

/**
 * @swagger
 * /api/notes/{id}/summarize:
 *   post:
 *     summary: Generate AI summary of a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Summary generated successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Failed to generate summary
 */

noteRouter.post("/:id/summarize", (req, res) => {
  noteController.summerizeNote(req, res);
});
