import fs from "fs";

const input = fs.readFileSync("./day1_calorie_counting2.txt", "utf8");

const data = input.split("\n\n").map((item) =>
  item.split("\n").reduce((sum, val) => {
    sum += +val;
    return sum;
  }, 0)
);

const max1 = Math.max(...data);

console.log("🚀 ~ file: day1_calorie_counting.js:13 ~ max", max1);

const max2 = Math.max(...data.filter((item) => item !== max1));
const max3 = Math.max(...data.filter((item) => item !== max1 && item !== max2));

console.log("🚀 ~ file: day1_calorie_counting.js:13 ~ max", max1 + max2 + max3);
