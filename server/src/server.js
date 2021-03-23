import http from "http";
import app from "./app.js";
import { initDb } from "./db.js";

await initDb();

const port = process.env.PORT || "9000";

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
