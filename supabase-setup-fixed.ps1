# Supabase CLI Setup and Deployment Script
# Run this after getting your access token

param(
    [Parameter(Mandatory=$true)]
    [string]$AccessToken
)

Write-Host "🔑 Setting up Supabase CLI with access token..." -ForegroundColor Cyan

# Set the access token as environment variable
$env:SUPABASE_ACCESS_TOKEN = $AccessToken

Write-Host "✅ Access token set" -ForegroundColor Green

# Test connection
Write-Host "🔍 Testing connection..." -ForegroundColor Yellow
npx supabase projects list

# Set the Gemini API key secret
Write-Host "🔐 Setting Gemini API key secret..." -ForegroundColor Yellow
# Note: Replace with your real Gemini API key from https://makersuite.google.com/app/apikey
npx supabase secrets set GEMINI_API_KEY=AIzaSyC1VCj9e4t0RLdHl_yHaIdTaCowNlcGwss

# Deploy the Edge Function
Write-Host "🚀 Deploying Edge Function..." -ForegroundColor Yellow
npx supabase functions deploy generate-content

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "🎉 Your Edge Function should now work with real Gemini AI!" -ForegroundColor Green
