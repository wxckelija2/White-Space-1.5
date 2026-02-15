# Set up Gemini API key as Supabase secret
# Run this script to configure the secret for your Edge Function

Write-Host "Setting up Gemini API key as Supabase secret..." -ForegroundColor Green

# Check if Supabase CLI is installed
if (!(Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI not found. Installing..." -ForegroundColor Red
    npm install -g supabase
}

# Set the secret
Write-Host "Setting GEMINI_API_KEY secret..." -ForegroundColor Yellow
supabase secrets set GEMINI_API_KEY=AIzaSyC1VCj9e4t0RLdHl_yHaIdTaCowNlcGwss

Write-Host "✅ Secret set successfully!" -ForegroundColor Green
Write-Host "Now redeploy your Edge Function:" -ForegroundColor Cyan
Write-Host "supabase functions deploy generate-content" -ForegroundColor Cyan
