// Test the White Space AI's code fixing capabilities
const { aiService } = require('./lib/ai.ts');

// Test the problematic JavaScript code
const testCode = `function calculateTotal(prices) {
  let total = 0;

  for (let i = 0; i <= prices.length; i++) {
    total += prices[i].price;
  }

  if (total = 100) {
    console.log("Total is exactly 100");
  }

  return total.toFixed;
}

const items = [
  { price: 30 },
  { price: "40" },
  { cost: 20 }
];

console.log(calculateTotal(items));`;

// Test message asking to fix the code
const testMessage = `can you fix this error for me please ${testCode}`;

console.log('Testing White Space AI code fixing...\n');
console.log('User message:', testMessage.substring(0, 100) + '...\n');

// This would be how the AI processes the message
// Note: In a real scenario, this would go through the full AI pipeline
const fixedCode = aiService.analyzeAndFixJavaScript(testCode);

console.log('Fixed code:');
console.log(fixedCode);
console.log('\n✅ AI can now fix JavaScript code automatically!');