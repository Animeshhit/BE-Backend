const express = require("express");
const connectToDataBase = require("./db/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/authentications/route.js");
const contactRouter = require("./routes/contact/route.js");

//microprocesser
//scaling
//handle more user
//security

dotenv.config();

const PORT = process.env.PORT || "3040";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Hmm Animesh Server is Running Perfect",
  });
});

app.use("/api/v2", authRouter);
app.use("/api/v2", contactRouter);

connectToDataBase((isConnected) => {
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  }
});
