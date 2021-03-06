import mongoose from "mongoose";

const listItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    list: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    dateAdded: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    dateCompleted: {
      type: Date,
      required: false,
    },
    completedBy: {
      type: String,
      required: false,
      default: "",
    },
    infoShow: {
      type: Boolean,
      required: true,
      default: false,
    },
    itemDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("ListItem", listItemSchema);

export default List;
