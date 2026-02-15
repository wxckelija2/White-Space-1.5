# --- Config ---
$ProjectRef = 'yvpafwyfcgzdtiaenylu'   # your project ref
$Function = 'generate-content'        # change to your function name
$AnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cGFmd3lmY2d6ZHRpYWVueWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTkyMTMsImV4cCI6MjA4MDk5NTIxM30.z0rVDKEP-Ae47hbT0tZ6Fi_b793y6GcyZ8bSO9M-V3I'

# Example JSON payload. Edit as needed for your function.
$BodyObject = @{
  prompt = 'Write a 1-line poem about winter.'
}
$BodyJson = $BodyObject | ConvertTo-Json -Depth 5

# --- Request ---
$Url = "https://$ProjectRef.supabase.co/functions/v1/$Function"

$Headers = @{
  'Authorization' = "Bearer $AnonKey"
  'Content-Type'  = 'application/json'
}

try {
  $response = Invoke-RestMethod -Method POST -Uri $Url -Headers $Headers -Body $BodyJson

  Write-Host "Status: 200 OK"
  $response | ConvertTo-Json -Depth 8
}
catch {
  if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $errorBody = $reader.ReadToEnd()
    Write-Host "Status: $statusCode"
    Write-Host "Body: $errorBody"
  } else {
    Write-Host "Request failed: $($_.Exception.Message)"
  }
}
