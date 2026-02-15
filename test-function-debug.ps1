# Debug test - check if API key is working
$ProjectRef = 'yvpafwyfcgzdtiaenylu'
$Function = 'generate-content'
$AnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I'

# Test 1: Simple request to see what happens
Write-Host "=== Test 1: Basic function call ==="
$BodyObject = @{ prompt = 'Hello world' }
$BodyJson = $BodyObject | ConvertTo-Json -Depth 5

$Url = "https://$ProjectRef.supabase.co/functions/v1/$Function"
$Headers = @{
  'Authorization' = "Bearer $AnonKey"
  'Content-Type'  = 'application/json'
}

try {
  $response = Invoke-RestMethod -Method POST -Uri $Url -Headers $Headers -Body $BodyJson
  Write-Host "SUCCESS! Response:"
  $response | ConvertTo-Json -Depth 8
} catch {
  if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "Status: $statusCode"
    Write-Host "Error Body: $errorBody"
  } else {
    Write-Host "Request failed: $($_.Exception.Message)"
  }
}

# Test 2: Check if the API key works directly
Write-Host "`n=== Test 2: Direct Gemini API test ==="
$GeminiApiKey = 'AIzaSyC1VCj9e4t0RLdHl_yHaIdTaCowNlcGwss'
$GeminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=$GeminiApiKey"

$GeminiBody = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = 'Say hello'
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

$GeminiHeaders = @{
    'Content-Type' = 'application/json'
}

try {
  $geminiResponse = Invoke-RestMethod -Method POST -Uri $GeminiUrl -Headers $GeminiHeaders -Body $GeminiBody
  Write-Host "Direct Gemini API works!"
  $geminiResponse.candidates[0].content.parts[0].text
} catch {
  Write-Host "Direct Gemini API failed - this might be the issue"
  if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "Status: $statusCode"
    Write-Host "Error: $errorBody"
  }
}
