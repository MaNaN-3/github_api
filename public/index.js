const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const gitToken = "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";
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: gitToken,
});
const cors = require("cors");
const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const oct = async (name, repos, user_name, date2, callback) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls?state=closed&sort=created&direction=desc",
    {
      owner: name,
      repo: repos,
    }
  );
  console.log(response);
};
// app.use("/api", api);
app.get("/", function (req, res) {
  // res.send("Server is up and running!");
  oct("ankidroid", "Anki-Android");
});
app.listen(5000, function () {
  console.log("Server is listening");
});
