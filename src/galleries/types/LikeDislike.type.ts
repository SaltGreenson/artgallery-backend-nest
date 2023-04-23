import mongoose from "mongoose";

export type LikeDislikeType = {
  userId: mongoose.Types.ObjectId;
  galleryId: string;
  variant: "like" | "dislike";
};
