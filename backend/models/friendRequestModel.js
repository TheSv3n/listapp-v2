import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
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

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;
