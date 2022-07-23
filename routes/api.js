// const express = require("express");
// const https = require("https");

const gitToken = "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";
// router.get("/github/userinfo/:user/:repo", async function (req, res) {
//   const user = req.params.user;
//   const repo = req.params.repo;
//   const options = {
//     hostname: "api.github.com",
//     path: "/repos/" + user + "/" + repo + "/pulls",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36",
//     },
//     OAUth: gitToken,
//   };
//   https
//     .get(options, function (apiResponse) {
//       // console.log(apiResponse);
//       // apiResponse.on("data", function (chunk) {
//       //   console.log(JSON.parse(chunk));
//       // });
//       var body = "";
//       apiResponse.on("data", function (chunk) {
//         body += chunk;
//       });
//       apiResponse.on("end", function () {
//         console.log(body);
//         res.send(body[0]);
//       });
//       //   const data = JSON.parse(apiResponse);
//       // apiResponse.pipe(res);
//     })
//     .on("error", (e) => {
//       console.log(e);
//       res.status(500).send("Something wnent wrong!");
//     });
// });

// router.get("/github/repoinfo/:user/:reponame", async function (req, res) {
//   const user = req.params.user;
//   const reponame = req.params.reponame;
//   const options = {
//     hostname: "api.github.com",
//     path: "/repos/" + user + "/" + reponame,
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36",
//     },
//     OAUth: "<paste your token here>",
//   };
//   https
//     .get(options, function (apiResponse) {
//       apiResponse.pipe(res);
//     })
//     .on("error", (e) => {
//       console.log(e);
//       res.status(500).send("Something wnent wrong!");
//     });
// });

// router.get("/github/commitinfo/:user/:reponame", async function (req, res) {
//   const user = req.params.user;
//   const reponame = req.params.reponame;
//   const options = {
//     hostname: "api.github.com",
//     path: "/repos/" + user + "/" + reponame + "/commits",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36",
//     },
//     OAUth: "<paste your token here>",
//   };
//   https
//     .get(options, function (apiResponse) {
//       apiResponse.pipe(res);
//     })
//     .on("error", (e) => {
//       console.log(e);
//       res.status(500).send("Something wnent wrong!");
//     });
// });

const express = require("express"),
  router = express.Router(),
  cors = require("cors"),
  app = express(),
  bodyParser = require("body-parser"),
  axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

router.get("/api/repos", async (req, res) => {
  const name = "HarshCasper";
  const repo = "Rotten-Scripts";

  axios({
    method: "get",
    url: `https://api.github.com/repos/${name}/${repo}/pulls`,
    headers: {
      Authorization: `Bearer ${gitToken}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  })
    .then((response) => {
      for (var obj in response.data) {
        console.log(response.data[obj].number);
      }
      console.log(response.data.length);
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, () => {
  console.log("Server running on port %d", PORT);
});

module.exports = router;
