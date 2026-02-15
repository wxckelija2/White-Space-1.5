# Test Edge Function with authentication
# This shows how to call the function with proper authentication

Write-Host "🔐 Testing Edge Function with authentication..." -ForegroundColor Cyan
Write-Host "This will help you test the function properly." -ForegroundColor White

Write-Host "`n📋 Instructions:" -ForegroundColor Yellow
Write-Host "1. Open your app at http://localhost:8081" -ForegroundColor White
Write-Host "2. Log into your account" -ForegroundColor White
Write-Host "3. Open browser DevTools (F12) → Console" -ForegroundColor White
Write-Host "4. Copy and paste this code into the console:" -ForegroundColor White

Write-Host "`n📄 Code to paste in browser console:" -ForegroundColor Green
Write-Host "// Get your session token" -ForegroundColor Gray
Write-Host "supabase.auth.getSession().then(({data}) => {" -ForegroundColor Gray
Write-Host "  const token = data.session?.access_token;" -ForegroundColor Gray
Write-Host "  console.log('Your access token:', token?.substring(0, 50) + '...');" -ForegroundColor Gray
Write-Host "" -ForegroundColor Gray
Write-Host "  // Test the Edge Function" -ForegroundColor Gray
Write-Host "  fetch('https://yvpafwyfcgzdtiaenylu.supabase.co/functions/v1/generate-content', {" -ForegroundColor Gray
Write-Host "    method: 'POST'," -ForegroundColor Gray
Write-Host "    headers: {" -ForegroundColor Gray
Write-Host "      'Content-Type': 'application/json'," -ForegroundColor Gray
Write-Host "      'Authorization': \`Bearer \${token}\`," -ForegroundColor Gray
Write-Host "    }," -ForegroundColor Gray
Write-Host "    body: JSON.stringify({ prompt: 'Hello, tell me a joke' })" -ForegroundColor Gray
Write-Host "  }).then(r => r.text()).then(console.log);" -ForegroundColor Gray
Write-Host "});" -ForegroundColor Gray

Write-Host "`n✅ This should return a Gemini AI response!" -ForegroundColor Green
Write-Host "❌ If you get 401, check that GEMINI_API_KEY secret is set in Supabase dashboard" -ForegroundColor Red
