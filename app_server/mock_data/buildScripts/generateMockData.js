var jsf = require("json-schema-faker");
var fs = require("fs");

var schemaBase = require("./schema/mockDataSchema");
var mockDataSchema = require("./schema/mockDataSchema");

// node ./mock_data/buildScripts/generateMockData
jsf.resolve(mockDataSchema).then(sample => {
  const json = JSON.stringify(sample);

  fs.writeFile("./mock_data/data/template.json", json, function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Mock data generated.");
    }
  });

  // console.log(sample);
  // console.log(sample.user.name);
});

// const json = JSON.stringify(jsf.generate(mockDataSchema));
// fs.writeFile("./mock_data/data/template.json", json, function(err) {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log("Mock data generated.");
//   }
// });
