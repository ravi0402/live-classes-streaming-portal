require("dotenv").config({ silent: true });

const express = require("express");
const compression = require("compression");
const path = require("path");
const logger = require("./middleware/logger");
const { devMiddleware, hotMiddleware } = require("./middleware/webpack");

const app = express();

app.set("x-powered-by", false);

app.use(compression());
app.use(logger);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
} else {
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

const adminApis = require("./controllerIf");
const newAdmin = new adminApis(process.env.CONTROLLER_URL, process.env.API_KEY, process.env.API_SECRET);

app.get("/create-session/", (req, res) => {
  newAdmin.createSession({ mediaMode: "routed", duration: 3600 }).then(function (newSessionId) {
    console.log("Got sessionId=" + newSessionId);
    res.send({ sessionId: newSessionId });
  });
})

app.post("/generate-session/", (req, res) => {
  console.log(req.body);
  const sessionId = req.body.sessionId;
  var options = {
    role: "publisher",
    expireTime: Math.round(Date.now() / 1000 + 3600 * 24),
    data: "UserSpecificData"
  };

  newAdmin.generateToken(sessionId, options).then((clientToken) => {
    console.log("Got token=" + clientToken);
    res.send({ clientToken });
  });
})


app.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.resolve("build", "index.html"));
  } else {
    res.write(devMiddleware.fileSystem.readFileSync(path.resolve("build", "index.html")));
    res.end();
  }
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log("Express started at http://localhost:%d\n", server.address().port);
  if (process.env.NODE_ENV !== "production") {
    console.log("Waiting for webpack...\n");
  }
});
