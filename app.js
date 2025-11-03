const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

dotenv.config();

// application/json
app.use(express.json());

app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
});