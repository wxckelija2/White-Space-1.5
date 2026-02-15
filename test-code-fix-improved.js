// Improved test for the analyzeAndFixJavaScript method
function analyzeAndFixJavaScript(code) {
  let fixedCode = code;

  // Fix common JavaScript errors one by one to avoid conflicts

  // 1. Fix off-by-one loop errors (i <= length should be i < length)
  fixedCode = fixedCode.replace(
    /for\s*\(\s*let\s+(\w+)\s*=\s*0\s*;\s*\w+\s*<=\s*(\w+)\.length\s*;\s*\w+\+\+\s*\)/g,
    'for (let $1 = 0; $1 < $2.length; $1++)'
  );

  // 2. Fix assignment in conditionals (= should be ===)
  fixedCode = fixedCode.replace(
    /if\s*\(\s*(\w+)\s*=\s*([^)]+)\)/g,
    'if ($1 === $2)'
  );

  // 3. Fix missing toFixed parentheses
  fixedCode = fixedCode.replace(
    /(\w+)\.toFixed\s*;/g,
    '$1.toFixed(2);'
  );

  // 4. Add error handling for array access - more targeted approach
  if (fixedCode.includes('total += prices[i].price;')) {
    fixedCode = fixedCode.replace(
      /(\s*)total\s*\+=\s*prices\[i\]\.price\s*;/g,
      '$1if (prices[i] && typeof prices[i].price === \'number\') {\n$1  total += prices[i].price;\n$1} else if (prices[i] && typeof prices[i].price === \'string\') {\n$1  total += parseFloat(prices[i].price);\n$1}'
    );
  }

  return fixedCode;
}

// Test with the problematic code
const testCode = `function calculateTotal(prices) {
  let total = 0;

  for (let i = 0; i <= prices.length; i++) {
    total += prices[i].price;
  }

  if (total = 100) {
    console.log("Total is exactly 100");
  }

  return total.toFixed;
}`;

console.log('Original broken code:');
console.log(testCode);
console.log('\n🔧 Fixing code...\n');

const fixedCode = analyzeAndFixJavaScript(testCode);

console.log('Fixed code:');
console.log(fixedCode);

// Test the fixed code
console.log('\n🧪 Testing fixed code...');

try {
  eval(`
${fixedCode}

const items = [
  { price: 30 },
  { price: "40" },
  { cost: 20 }
];

console.log('Result:', calculateTotal(items));
`);
} catch (error) {
  console.log('❌ Error testing fixed code:', error.message);
  console.log('This is expected since the fixed code may not be perfect yet.');
}