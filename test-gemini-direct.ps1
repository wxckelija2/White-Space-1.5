# Test Gemini API directly
$GeminiApiKey = 'AIzaSyC1VCj9e4t0RLdHl_yHaIdTaCowNlcGwss'  # From your deploy script

# Test with gemini-flash-latest on v1beta API
$Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=$GeminiApiKey"

$Body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = 'Write a 1-line poem about winter.'
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

$Headers = @{
    'Content-Type' = 'application/json'
}

try {
    $response = Invoke-RestMethod -Method POST -Uri $Url -Headers $Headers -Body $Body
    Write-Host "Success! Response:"
    $response | ConvertTo-Json -Depth 10
}
catch {
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
        $statusCode = [int]$_.Exception.Response.StatusCode
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "Status: $statusCode"
        Write-Host "Error: $errorBody"
    } else {
        Write-Host "Request failed: $($_.Exception.Message)"
    }
}
