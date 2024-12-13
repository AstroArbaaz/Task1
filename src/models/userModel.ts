import mongoose, { Schema, Document } from "mongoose";
import { IItems, IAddress } from "../interfaces/user";

const AddressSchema: Schema<IAddress> = new Schema({
  city: { type: String,  },
  state: { type: String,  },
  country: { type: String,  },
  street: { type: String,  },
});

const UserSchema: Schema<IItems & Document> = new Schema(
  {
    id: { type: String },
    gender: { type: String,  },
    name: { type: String,  },
    address: { type: AddressSchema,},
    email: { type: String },
    age: { type: String,  },
    picture: { type: String,  },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IItems & Document>("User", UserSchema);
