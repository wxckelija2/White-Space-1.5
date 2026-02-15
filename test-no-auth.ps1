# Test without Authorization header to see the error
$ProjectRef = 'yvpafwyfcgzdtiaenylu'
$Function = 'generate-content'

$BodyObject = @{
  prompt = 'Test without auth'
}
$BodyJson = $BodyObject | ConvertTo-Json -Depth 5

$Url = "https://$ProjectRef.supabase.co/functions/v1/$Function"

$Headers = @{
  'Content-Type'  = 'application/json'
}  # No Authorization header

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
