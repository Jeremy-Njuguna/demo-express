const express = require("express");
const jwt = require("jsonwebtoken");
const routes = require("./routes");

const app = express();
app.use(express.json());

// health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "UP" });
});

app.use("/", routes);

// fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
