const fs = require("fs");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync("./chess.schema.json", "utf-8"));

const validate = ajv.compile(schema);

/* the file with the JSON data to validate */
const data = JSON.parse(fs.readFileSync("./example.json", "utf-8"));

const valid = validate(data);

if (valid) {
  console.log("JSON is valid!");
} else {
  console.log("Errors:");
  console.log(validate.errors);
}
