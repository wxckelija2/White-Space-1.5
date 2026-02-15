// Test component to debug AI integration in your app
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { aiService } from '../lib/ai';

export default function AITest() {
  const [prompt, setPrompt] = useState('Write a 1-line poem about winter.');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🔍 Debug Info:');
      console.log('   Provider:', aiService.getProvider());
      console.log('   Available providers:', aiService.getAvailableProviders());
      console.log('   EXPO_PUBLIC_AI_PROVIDER:', process.env.EXPO_PUBLIC_AI_PROVIDER);

      const response = await aiService.generate({
        type: 'generate',
        prompt: prompt
      });

      setResult(response);
      console.log('✅ Success:', response);
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Integration Test</Text>

      <Text style={styles.label}>Current Provider: {aiService.getProvider()}</Text>
      <Text style={styles.label}>Available: {aiService.getAvailableProviders().join(', ')}</Text>

      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter your prompt..."
        multiline
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={testAI}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Generating...' : 'Test AI'}
        </Text>
      </TouchableOpacity>

      {error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>❌ Error: {error}</Text>
        </View>
      )}

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>✅ Success!</Text>
          <Text style={styles.resultMeta}>
            Provider: {result.metadata?.provider} | Model: {result.metadata?.model}
          </Text>
          <Text style={styles.resultContent}>{result.content}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  errorText: {
    color: '#c62828',
    fontSize: 16,
  },
  result: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  resultMeta: {
    fontSize: 14,
    color: '#388e3c',
    marginBottom: 10,
  },
  resultContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1b5e20',
  },
});
