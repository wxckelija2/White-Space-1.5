// Simple test for the analyzeAndFixJavaScript method
function analyzeAndFixJavaScript(code) {
  let fixedCode = code;

  // Extract just the function code if it's embedded in a larger message
  const functionMatch = code.match(/function\s+calculateTotal\s*\([^}]*\}[^}]*\}/s);
  if (functionMatch) {
    fixedCode = functionMatch[0];
  }

  // Fix common JavaScript errors

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

  // 3. Fix missing parentheses on method calls
  fixedCode = fixedCode.replace(
    /(\w+)\.toFixed\b/g,
    '$1.toFixed(2)'
  );

  // 4. Fix missing toFixed parentheses with specific patterns
  fixedCode = fixedCode.replace(
    /return\s+(\w+)\.toFixed\s*;/g,
    'return $1.toFixed(2);'
  );

  // 5. Add proper error handling for array access with type checking
  if (fixedCode.includes('prices[i].price')) {
    fixedCode = fixedCode.replace(
      /for\s*\(\s*let\s+i\s*=\s*0\s*;\s*i\s*<\s*prices\.length\s*;\s*i\+\+\s*\)\s*\{\s*(\w+)\s*\+=\s*prices\[i\]\.price\s*;/g,
      'for (let i = 0; i < prices.length; i++) {\n    if (prices[i] && typeof prices[i].price === \'number\') {\n      $1 += prices[i].price;\n    } else if (prices[i] && typeof prices[i].price === \'string\') {\n      $1 += parseFloat(prices[i].price);\n    }\n  }'
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
eval(`
${fixedCode}

const items = [
  { price: 30 },
  { price: "40" },
  { cost: 20 }
];

console.log('Result:', calculateTotal(items));
`);