import noteModel from "../schemas/note.schema.js";

export default class NoteRepository {
  async addNote(noteData) {
    try {
      return await noteModel.create(noteData);
    } catch (error) {
      console.log(error);
      throw new ApplicationError(500, "Something wrong with your database");
    }
  }
  async findNoteById(id) {
    try {
      return await noteModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new ApplicationError(500, "Something wrong with your database");
    }
  }
  async updateNoteSummary(noteId, summary) {
    return await noteModel.findByIdAndUpdate(
      noteId,
      { summary },
      { new: true },
    );
  }
}
