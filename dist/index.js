"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const express_1 = __importDefault(require("express"));
// import productRoute from "./routes/product.route.js";
// import todoRoute from "./routes/todo.route.js";
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware
(0, db_1.default)()
    .then(() => {
    app.listen(PORT, () => console.log("Server started at port " + PORT));
})
    .catch((error) => console.log("Error ", error.message));
//routes
// app.use("/api/v1/product", productRoute);
// app.use("/api/v1/todo", todoRoute);
