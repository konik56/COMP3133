const fs = require("fs");
const csv = require("csv-parser");

const filePath = "./input_countries.csv";

const data = [];

const canadaFileExists = fs.existsSync("./canada.txt");
const usaFileExists = fs.existsSync("./usa.txt");

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {
    data.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");

    const header = "Country, Year, Population";

    if (!canadaFileExists) {
      const canada = data
        .filter((row) => row.country === "Canada")
        .map((row) => `${row.country}, ${row.year}, ${row.population}`)
        .join("\n");

      const canadaText = `${header}\n${canada}`;

      fs.writeFile("./canada.txt", canadaText, (err) => {
        if (err) {
          console.error("Error writing to TXT file:", err);
        } else {
          console.log("Filtered data has been written.");
        }
      });
    }

    if (!usaFileExists) {
      const unitedStates = data
        .filter((row) => row.country === "United States")
        .map((row) => `${row.country}, ${row.year}, ${row.population}`)
        .join("\n");

      const usaText = `${header}\n${unitedStates}`;

      fs.writeFile("./usa.txt", usaText, (err) => {
        if (err) {
          console.error("Error writing to TXT file:", err);
        } else {
          console.log("Filtered data has been written.");
        }
      });
    }
  })
  .on("error", (err) => {
    console.error("Error reading the file...", err);
  });
