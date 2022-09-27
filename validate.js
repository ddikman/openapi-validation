var fs = require('fs');
var Validator = require('jsonschema').Validator;
var v = new Validator();

const args = process.argv;
if (args.length != 7) {
    console.log("not enough arguments")
    console.log("Usage: node validate.js <schema file> <response json>")
    process.exit(1);
}

const schemaFilename = args[2]
const testFilename = args[3]

function parseJson(filename) {
  try {
    var data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Failed to parse json from file, confirm it has json contents: ${filename}`);
    console.error(err)
    process.exit(1);
  }
}

var schema = parseJson(schemaFilename);
var response = parseJson(testFilename);

const path = args[4]
const method = args[5]
const status = args[6]

if (!schema[path]) {
  console.error(`No schema defined for path: ${path}`);
  process.exit(1);
}

if (!schema[path][method]) {
  console.error(`No schema defined for method: ${method}`);
  process.exit(1);
}

if (!schema[path][method]['responses'][status]) {
  console.error(`No response defined for status code: ${status}`);
  process.exit(1);
}

console.log(v.validate(response, schema[path][method]['responses'][status]));