import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
    sharedWith: [String],
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
    dateDeleted: {
      type: Date,
      required: false,
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
