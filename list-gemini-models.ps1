# List available Gemini models
$GeminiApiKey = 'AIzaSyC1VCj9e4t0RLdHl_yHaIdTaCowNlcGwss'

# List models
$Url = "https://generativelanguage.googleapis.com/v1beta/models?key=$GeminiApiKey"

try {
    $response = Invoke-RestMethod -Method GET -Uri $Url
    Write-Host "Available models:"
    $response.models | Where-Object { $_.name -like "*gemini*" } | ForEach-Object {
        Write-Host "- $($_.name)"
        Write-Host "  Supported methods: $($_.supportedGenerationMethods -join ', ')"
        Write-Host ""
    }
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
