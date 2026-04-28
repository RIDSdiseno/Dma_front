$ErrorActionPreference = 'Stop'
$outDir = Join-Path -Path $PSScriptRoot -ChildPath "..\src\assets"
if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

$files = @(
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/24-1-768x1024.jpg'; name = 'array-24-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/23-1-1024x768.jpg'; name = 'array-23-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/25-1-768x1024.jpg'; name = 'array-25-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/26-1-768x1024.jpg'; name = 'array-26-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/27-1-768x1024.jpg'; name = 'array-27-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/21-1-768x1024.jpg'; name = 'array-21-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/30-1.jpg'; name = 'array-30-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/12/21-1.png'; name = 'array-21-1.png' }
)

Write-Host "Descargando ${($files.Count)} imágenes a $outDir..."
foreach ($f in $files) {
  $dest = Join-Path $outDir $f.name
  try {
    Invoke-WebRequest -Uri $f.url -OutFile $dest -UseBasicParsing -ErrorAction Stop
    Write-Host "OK: $($f.name)"
  } catch {
    Write-Warning "Fallo descarga: $($f.url) -> $_"
  }
}

Write-Host "Descarga finalizada."
