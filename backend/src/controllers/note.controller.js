import ApplicationError from "../error-handler/application-error.js";
import NoteRepository from "../repositories/note.repository.js";
import { generateSummary } from "../services/ai.service.js";
import { generatePassword } from "../utills/generate-password.js";
import bcrypt from "bcrypt";

export default class NoteController {
  constructor() {
    this.noteRepository = new NoteRepository();
  }
  async addNote(req, res) {
    const { text } = req.body;
    // Empty text check
    if (!text || text.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Note cannot be empty" });
    }
    // Character check
    if (text.length > 500) {
      return res
        .status(400)
        .json({ success: false, message: "Note must be under 500 characters" });
    }
    // Generate Password
    const plainPassword = generatePassword();
    // Hash Password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const noteData = {
      text,
      password: hashedPassword,
    };
    try {
      // Save using repository
      const newNote = await this.noteRepository.addNote(noteData);

      // Create Share URL
      const noteUrl = `${req.protocol}://${req.get("host")}/api/notes/${newNote._id}`;

      return res.status(201).json({
        success: true,
        data: {_id: newNote._id, url: noteUrl, password: plainPassword },
      });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(400, "Something went wrong!");
    }
  }

  async unlockNote(req, res) {
    const { id } = req.params;
    const { password } = req.body;
    // Check password provided
    if (!password || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    try {
      // find the note
      const note = await this.noteRepository.findNoteById(id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found",
        });
      }
      // compare password.

      // 🔐 Compare password
      const isMatch = await bcrypt.compare(password, note.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      return res.status(200).json({
        success: true,
        data: {
          text: note.text,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(400, "Something went wrong!");
    }
  }
  async summerizeNote(req, res) {
    const { id } = req.params;

    try {
      // Find note
      const note = await this.noteRepository.findNoteById(id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: "Note not found",
        });
      }

      // Call AI service
      const summary = await generateSummary(note.text);

      if (!summary) {
        return res.status(500).json({
          success: false,
          message: "Failed to generate summary",
        });
      }

      // Save summary in DB
      await this.noteRepository.updateNoteSummary(id, summary);

      return res.status(200).json({
        success: true,
        data: {
          summary,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(400, "Something went wrong!");
    }
  }
}
