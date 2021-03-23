import db from "../db.js";
const Schema = db.Schema;

const UrlSchema = new Schema(
  {
    short: {
      type: String,
      required: true,
      unique: true,
    },
    long: {
      type: String,
      required: true,
      unique: true,
    },
    seq_id: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export default db.model("Url", UrlSchema);
