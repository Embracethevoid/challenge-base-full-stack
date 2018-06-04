const http = require("http");
const app = require("./Service/app");
const acme = require("./Suppliers/acme/acme")
const rainer = require("./Suppliers/rainer/rainer")


const serviceServer = http.createServer(app);
const serviceHostname = "localhost";
const servicePort = 8000;
serviceServer.listen(servicePort,serviceHostname,() => {
  console.log(`Server running at http://${serviceHostname}:${servicePort}`);
});


const acmeServer = http.createServer(acme);
const acmeHostname = "localhost";
const acmePort = 3050;
acmeServer.listen(acmePort,acmeHostname,() => {
  console.log(`Server running at http://${acmeHostname}:${acmePort}`);
});




const rainerServer = http.createServer(rainer);
const rainerHostname = "localhost";
const rainerPort = 3051;
rainerServer.listen(rainerPort,rainerHostname,() => {
  console.log(`Server running at http://${rainerHostname}:${rainerPort}`);
});
