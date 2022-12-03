const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/day1_calorie_counting.txt`, 'utf8');

const parsedData = input
  .split('\n\n')
  .map((item) => item.split('\n').reduce((sum, val) => sum + +val, 0));

const max1 = Math.max(...parsedData);

console.log('🚀 ~ file: day1_calorie_counting.js:13 ~ max', max1);

const max2 = Math.max(...parsedData.filter((item) => item !== max1));
const max3 = Math.max(...parsedData.filter((item) => item !== max1 && item !== max2));

console.log('🚀 ~ file: day1_calorie_counting.js:13 ~ max', max1 + max2 + max3);
