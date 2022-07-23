const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const gitToken = process.env.GIT_TOKEN;
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

// app.use("/api", api);
app.get("/", function (req, res) {
  res.send("Server is up and running!");
});

const router = express.Router();

app.get("/api", async (req, res, next) => {
  const name = "ankidroid";
  const repo = "Anki-Android";
  const user_name = "raddi1972";
  const date2 = new Date("2022-05-22");
  oct(name, repo, user_name, date2, (callback) => {
    res.send(callback);
  });
});

const checker = async (response, name, date2) => {
  const data = response.data;
  var date2_ms = date2.getTime();
  for (const key in data) {
    u = data[key];
    if (u.merged_at) {
      var date1 = new Date(u.merged_at.slice(0, 10));
      var date1_ms = date1.getTime();
      if (date1_ms < date2_ms) {
        return false;
      } else if (u.merged_at && name === u.user.login) {
        console.log(u.merged_at);
        console.log(name);
      }
    }
  }
  return true;
};
const oct2 = async (st, num, name, date2) => {
  const response = await octokit.request("GET " + st + num);
  const head = response.headers;
  const links = head.link.split(",");
  const urls = links.map((a) => {
    return {
      url: a.split(";")[0].replace(">", "").replace("<", "").replace(" ", ""),
      title: a.split(";")[1].replace(" ", ""),
    };
  });
  var nextreq = false;
  urls.forEach((u) => {
    if (u.title === 'rel="next"') {
      // console.log(num);
      nextreq = true;
    }
  });
  const ans = await checker(response, name, date2);
  if (ans && nextreq) {
    await oct2(st, num + 1, name, date2);
  }
};
const oct = async (name, repos, user_name, date2, callback) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls?state=closed&sort=created&direction=desc",
    {
      owner: name,
      repo: repos,
    }
  );

  const head = response.headers;
  if (head.link) {
    const links = head.link.split(",");
    const urls = links.map((a) => {
      return {
        url: a.split(";")[0].replace(">", "").replace("<", "").replace(" ", ""),
        title: a.split(";")[1].replace(" ", ""),
      };
    });
    var nextreq = true;
    var st = urls.at('rel="first"').url;
    await oct2(st.slice(22, st.length - 1), 2, user_name, date2);
  }
  console.log("Query end");
  return callback(response.data);
};

app.use(router);
app.listen(3000, function () {
  console.log("Server is listening");
});
