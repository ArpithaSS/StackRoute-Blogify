const express = require("express");
const httpProxy = require("http-proxy");
const Consul = require("consul");
const app = express();

const proxy = httpProxy.createProxyServer();
let consul = new Consul();

app.all("/api/auth*", async (req, res) => {
  let result = await consul.catalog.service
    .nodes("AuthService")
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error occurred while processing request" });
    });
  const serviceNode = result[0];
  const serviceUrl = `${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
  proxy.web(req, res, { target: serviceUrl });
});

app.all("/api/blogs*", async (req, res) => {
    let result = await consul.catalog.service
      .nodes("BlogService")
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Error occurred while processing request" });
      });
    const serviceNode = result[0];
    const serviceUrl = `${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
    proxy.web(req, res, { target: serviceUrl });
  });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
