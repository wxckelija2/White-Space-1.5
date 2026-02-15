function calculateTotal(prices) {
  let total = 0;

  for (let i = 0; i < prices.length; i++) {
    // Ensure we have a valid price and convert strings to numbers
    const item = prices[i];
    if (item && typeof item.price === 'number') {
      total += item.price;
    } else if (item && typeof item.price === 'string') {
      // Convert string prices to numbers
      const price = parseFloat(item.price);
      if (!isNaN(price)) {
        total += price;
      }
    }
    // Skip items without valid price property
  }

  if (total === 100) {
    console.log("Total is exactly 100");
  }

  return total.toFixed(2);
}

const items = [
  { price: 30 },
  { price: "40" },
  { cost: 20 } // This item doesn't have a price property, so it will be skipped
];

console.log(calculateTotal(items));