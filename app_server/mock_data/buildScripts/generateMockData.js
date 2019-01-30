// /* This script generates mock data for local development.
//    This way you don't have to point to an actual API,
//    but you can enjoy realistic, but randomized data,
//    and rapid page loads due to local, static data.
//  */

// var jsf = require('json-schema-faker');
// var mockDataSchema = require('./mockDataSchema');
// var fs = require('fs');
// // import jsf from 'json-schema-faker';
// // import mockDataSchema from './mockDataSchema';
// // import fs from 'fs';

// //var fs = require('fs');

// var json = JSON.stringify(jsf.generate(mockDataSchema));

// fs.writeFile('./src/api/db.json', json, function(err) {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log('Mock data generated.');
//   }
// });

// // generate

var jsf = require("json-schema-faker");
var mockDataSchema = require("./mockDataSchema");
var fs = require("fs");

const schema = {
  type: "object",
  properties: {
    user: {
      type: "object",
      properties: {
        id: {
          $ref: "#/definitions/positiveInt"
        },
        name: {
          type: "string",
          faker: "name.findName",
          minLength: 1000
        },
        email: {
          type: "string",
          format: "email",
          faker: "internet.email"
        }
      },
      required: ["id", "name", "email"]
    }
  },
  required: ["user"],
  definitions: {
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

// use the async-version (preferred way)
jsf.resolve(schema).then(sample => {
  console.log(sample);
  // "[object Object]"

  console.log(sample.user.name);
  // "John Doe"
});

// sync-version (blocking)
const asd = jsf.generate(mockDataSchema); // [object Object]

var json = JSON.stringify(asd);

// ./../app_server/mock_data/index.js",
// node ./../app_server/mock_data/buildScripts/generateMockData
fs.writeFile("./../app_server/mock_data/data/template.json", json, function(
  err
) {
  if (err) {
    return console.log(err);
  } else {
    console.log("Mock data generated.");
  }
});
