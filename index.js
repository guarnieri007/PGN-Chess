const fs = require("fs");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync("./chess.schema.json", "utf-8"));

const validate = ajv.compile(schema);

const data = JSON.parse(fs.readFileSync("./example.json", "utf-8"));

const valid = validate(data);

if (valid) {
  console.log("✅ JSON is valid!");
} else {
  console.log("❌ Error:");
  validate.errors.forEach(err => {
    const match = err.instancePath.match(/\/moves\/(\d+)\//);
    let turnInfo = "";
    if (match) {
      const index = parseInt(match[1], 10);
      const turn = data.moves[index].turn;
      turnInfo = `\n   Offending value: ${JSON.stringify(data.moves[index])}`;
    }
    console.log(`\n- Error in ${err.instancePath}${turnInfo}\n`);
  });
}

