import mongoose, { Schema } from "mongoose";

const ordersSchema = new Schema(
  {
    foods: [{ type: Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Orders", ordersSchema);
