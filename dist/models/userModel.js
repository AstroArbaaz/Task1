"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AddressSchema = new mongoose_1.Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    street: { type: String, required: true },
});
const UserSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    picture: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    indexes: [
        { fields: { email: 1 } },
        { fields: { gender: 1 } },
        { fields: { "address.country": 1 } },
    ],
});
exports.User = mongoose_1.default.model("User", UserSchema);
