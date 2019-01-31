var fetch = require("node-fetch");
var FormData = require("form-data");

// {"user":{"id":4104423,"name":"eu do nulla labore quis","email":"G4j@GygLRWq.hlg"}}

// fetch("http://localhost:3004/user/")
//   .then(res => res.json())
//   .then(body => console.log(body));

// return;

var body = {
  id: 4104424,
  name: "eu do nulla labore quis",
  email: "G4j@GygLRWq.hlg"
};

fetch("http://localhost:3004/user/", {
  method: "POST",
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json" }
})
  .then(res => res.json())
  .then(json => console.log(json));
