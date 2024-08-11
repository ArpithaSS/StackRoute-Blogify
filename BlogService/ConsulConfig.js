const Consul = require("consul");

const ConsulConfiguration = (app) => {
  const consul = new Consul();
  consul.agent.service.register({
    name: "BlogService",
    address: "http://localhost",
    port: 5000,
    check: {
      http: "http://localhost:5000/health",
      interval: "10s",
      timeout: "5s",
    },
  });
  consul.agent.service.register({
    name: "AuthService",
    address: "http://localhost",
    port: 3000,
    check: {
        http: "http://localhost:3000/health",
        interval: "10s",
        timeout: "5s",
    },
  });

  app.get("/health", async (req, res) => {
    let result = await consul.catalog.service
      .nodes("BlogService")
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Error occurred while processing request" });
        return;
      });
    const serviceNode = result[0];
    const serviceUrl = `${serviceNode.ServiceAddress}:${serviceNode.ServicePort}`;
    res.send(`Service discovered at ${serviceUrl}`);
  });
};

module.exports = ConsulConfiguration;
