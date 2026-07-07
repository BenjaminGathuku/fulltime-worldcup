# publish.ps1 — copies new articles from Downloads and publishes
param([string]$msg = "New articles")
Get-ChildItem "$env:USERPROFILE\Downloads\*.md" |
  Where-Object { $_.LastWriteTime -gt (Get-Date).AddHours(-6) } |
  Copy-Item -Destination "$PSScriptRoot\src\content\articles\" -Force -PassThru |
  ForEach-Object { Write-Host "Copied: $($_.Name)" }
Set-Location $PSScriptRoot
git add .
git commit -m $msg
git push