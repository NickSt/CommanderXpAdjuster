# Commander XP Adjuster - Build Script
# This script prepares the mod for deployment in the 'dist' folder.

$ProjectRoot = Get-Location
$SourceDir = "$ProjectRoot\src"
$BuildDir = "$ProjectRoot\dist"

Write-Host "CXP [Build]: Cleaning build directory..." -ForegroundColor Cyan
if (Test-Path $BuildDir) {
    Remove-Item -Path "$BuildDir\*" -Recurse -Force
} else {
    New-Item -ItemType Directory -Path $BuildDir
}

Write-Host "CXP [Build]: Copying source files..." -ForegroundColor Cyan
Copy-Item -Path "$SourceDir\*" -Destination $BuildDir -Recurse -Force

Write-Host "CXP [Build]: Build complete! Deployment ready in $BuildDir" -ForegroundColor Green
