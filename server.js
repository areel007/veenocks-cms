import { app } from "./app.js";
import { connectToDatabase } from "./src/services/db.con.js";

const PORT = process.env.PORT || 4141;
const db = process.env.DB || "mongodb://127.0.0.1:27017/veenocks";

connectToDatabase(db);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
