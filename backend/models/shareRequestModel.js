import mongoose from "mongoose";

const shareRequestSchema = mongoose.Schema(
  {
    requestFrom: {
      type: String,
      required: true,
    },
    requestTo: {
      type: String,
      required: true,
    },
    dateSent: {
      type: Date,
      required: true,
    },
    fromName: {
      type: String,
      required: false,
    },
    listId: {
      type: String,
      required: false,
    },
    listName: {
      type: String,
      required: true,
    },
    response: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ShareRequest = mongoose.model("ShareRequest", shareRequestSchema);

export default ShareRequest;
