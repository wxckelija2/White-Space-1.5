// Test your app's AI integration
import { aiService } from './lib/ai';

// Test the current provider
console.log('Current AI provider:', aiService.provider);
console.log('Available providers:', aiService.getAvailableProviders());

// Test the Edge Function call
const testTask = {
  type: 'generate',
  prompt: 'Write a 1-line poem about winter.'
};

aiService.generate(testTask)
  .then(result => {
    console.log('✅ Success:', result);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    console.error('Error details:', error.message);
  });
