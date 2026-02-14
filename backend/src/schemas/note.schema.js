import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Note text is required"],
      maxlength: [500, "Note must be under 500 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Note text is required"],
    },
    summary: {
      type: String,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

noteSchema.index({ createdAt: 1 }, { expiredAfterSeconds: 3600 });
const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;
