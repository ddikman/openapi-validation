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

var schema = JSON.parse(fs.readFileSync(schemaFilename, 'utf8'));
var response = JSON.parse(fs.readFileSync(testFilename, 'utf8'));

const path = args[4]
const method = args[5]
const status = args[6]

console.log(v.validate(response, schema[path][method]['responses'][status]));