# Test the Edge Function setup
# This script tests if the Gemini API key secret is set up correctly

Write-Host "🔍 Testing Edge Function setup..." -ForegroundColor Cyan

# Test health endpoint (should work without auth)
Write-Host "Testing health endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "https://yvpafwyfcgzdtiaenylu.supabase.co/functions/v1/generate-content/health" -Method GET
    Write-Host "✅ Health check successful:" -ForegroundColor Green
    Write-Host "   Gemini key present: $($healthResponse.env.gemini_key_present)" -ForegroundColor White
    Write-Host "   Has authorization header: $($healthResponse.has_authorization_header)" -ForegroundColor White
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure you're logged into the app" -ForegroundColor White
Write-Host "2. Try sending a message in the chat" -ForegroundColor White
Write-Host "3. Check console for authentication and Edge Function logs" -ForegroundColor White

Write-Host "`n🔐 If still getting 401 errors:" -ForegroundColor Yellow
Write-Host "- Make sure the GEMINI_API_KEY secret is set in Supabase dashboard" -ForegroundColor White
Write-Host "- Redeploy the Edge Function after setting the secret" -ForegroundColor White
Write-Host "- Check that you're logged into the app before testing" -ForegroundColor White
