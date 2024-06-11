"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI not found in .env");
        }
        console.log("Connecting...");
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to the Database!");
    }
    catch (error) {
        console.log("Database connection error ", error.message);
    }
});
exports.default = setupDb;
