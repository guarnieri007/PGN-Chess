# PGN Chess JSON Validator

Validate chess match JSON files against the `chess.schema.json` schema using [AJV](https://ajv.js.org/).

## Requirements

- [Node.js](https://nodejs.org/) (recommended: LTS version)
- `npm` (comes with Node.js)

## Installation

```bash
npm install
```

## Project Structure

```text
.
├── chess.schema.json
├── index.js
├── inputs/
│   └── example.json
└── package.json
```

## How to Use

1. Put one or more `.json` files inside the `inputs/` folder.
2. You can edit `inputs/example.json` as a starting point.
3. Run:

```bash
npm run validate
```

(or `npm start`, which runs the same validator).

## Output Behavior

The script loads every `.json` file from `inputs/` and validates each one individually.

- If a file is valid:
  - `file-name.json -> VALID`
- If a file is invalid:
  - `file-name.json -> INVALID (...error details...)`
- If a file is malformed JSON:
  - `file-name.json -> INVALID JSON (...parse error...)`
- If there are no `.json` files in `inputs/`:
  - `No JSON files found in folder: ...`

## Example

```bash
npm run validate
```

Possible output:

```text
example.json -> VALID
invalid-example.json -> INVALID (/moves/0/turn must be integer)
```

