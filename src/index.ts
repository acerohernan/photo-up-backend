import app from "./app";
import { startConnection } from "./database";

const PORT = process.env.PORT || app.get("port");

async function main() {
  startConnection();
  await app.listen(PORT);
  console.log("Server on port", PORT);
}

main();
