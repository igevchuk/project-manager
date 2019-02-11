var jsf = require("json-schema-faker");
var fs = require("fs");

var schemaBase = require("./schema/schemaBase");
var mockDataSchema = require("./schema/mockDataSchema");
var mockTemplateSchema = require("./schema/mockTemplate");
var mockTemplateSchema2 = require("./schema/mockTemplate2");

// jsf.extend("faker", () => require("faker"));
jsf.resolve(mockTemplateSchema2).then(sample => {
  const json = JSON.stringify(sample);

  fs.writeFile("./mock_data/data/forms.json", json, function(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Mock data generated.");
    }
  });
});
