const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");


const SCHEMA_PATH = path.resolve(__dirname, "chess.schema.json");
const INPUT_DIR = path.resolve(__dirname, "inputs");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getJsonFilesFromInputDir(inputDir) {
  if (!fs.existsSync(inputDir)) {
    return [];
  }

  return fs
    .readdirSync(inputDir)
    .filter((fileName) => fileName.toLowerCase().endsWith(".json"));
}

function formatAjvErrors(errors = []) {
  return errors
    .map((error) => {
      const location = error.instancePath || "/";
      return `${location} ${error.message}`;
    })
    .join("; ");
}

function main() {
  const schema = loadJson(SCHEMA_PATH);
  const validate = ajv.compile(schema);
  const jsonFiles = getJsonFilesFromInputDir(INPUT_DIR);

  if (jsonFiles.length === 0) {
    console.log(`No JSON files found in folder: ${INPUT_DIR}`);
    return;
  }


  jsonFiles.forEach((fileName) => {
    const filePath = path.join(INPUT_DIR, fileName);

    try {
      const data = loadJson(filePath);
      const valid = validate(data);

      if (valid) {
        console.log(`\n${fileName} -> ✅ VALID👍`);
      } else {
        console.log(`\n${fileName} -> ❌ INVALID👎`);
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
    } catch (error) {
      console.log(`\n${fileName} -> INVALID JSON (${error.message})`);
    }
  });
}

main();
