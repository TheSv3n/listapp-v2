import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    listName: {
      type: String,
      required: true,
    },
    listFinished: {
      type: Boolean,
      required: false,
      default: false,
    },
    listType: {
      type: Number,
      required: true,
      default: 0,
    },
    listDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    dateAdded: {
      type: Date,
      required: true,
    },
    dateCompleted: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

export default List;
