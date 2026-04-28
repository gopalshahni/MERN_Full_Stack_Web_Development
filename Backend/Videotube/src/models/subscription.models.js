import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is Subscribing
    },
    channel: {
      type: Schema.Types.ObjectId, // one to whom  'subscriber' IS SUBSCRIBING
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
