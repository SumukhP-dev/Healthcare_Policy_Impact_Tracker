import path from "path";
import useSelector from "react-redux";

export default async function handler(req, res) {
  const fs = require("fs").promises;

  // Find the absolute path of the "json" directory
  const jsonDirectory = path.join(process.cwd(), "json");
  // Read the "data.json" file
  console.log(
    "File contents:",
    jsonDirectory +
      "public/datasets/2019-medi-cal-expansions/infant-mortality-data/" +
      req +
      ".json"
  );

  const fileContents = await fs.readFile(
    jsonDirectory +
      "public/datasets/2019-medi-cal-expansions/infant-mortality-data/" +
      req +
      ".json",
    "utf8"
  );

  // Return the content of the data file in JSON format
  res.status(200).json(JSON.parse(fileContents));
}
