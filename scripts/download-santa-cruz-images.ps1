$ErrorActionPreference = 'Stop'
$outDir = Join-Path -Path $PSScriptRoot -ChildPath "..\src\assets"
if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

$files = @(
  @{ url = 'https://dm-a.cl/wp-content/uploads/2022/12/EXTERIOR3-1024x512.jpg'; name = 'santa-exterior3.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2022/12/A-2-1024x579.jpg'; name = 'santa-A-2.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2022/12/EXTERIOR2-1024x504.jpg'; name = 'santa-exterior2.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2022/12/A-3-1024x576.jpg'; name = 'santa-A-3.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2022/12/A-1-1024x860.jpg'; name = 'santa-A-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2022/12/IMAGEN-LUGAR-1024x768.jpg'; name = 'santa-imagen-lugar.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/02/ISOMETRICA-PRIMER-PISO-WEB-1024x577.jpg'; name = 'santa-isometrica-piso1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/02/ISOMETRICA-SEGUNDO-PISO-WEB-1024x577.jpg'; name = 'santa-isometrica-piso2.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/02/PLANTA-SANTA-CRUZ-WEB-1024x577.jpg'; name = 'santa-planta1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/02/PLANTA-SANTA-CRUZ-TECHO-Y-SEGUNDO-PISO-1024x577.jpg'; name = 'santa-planta-techo.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/02/ISOMETRICA-WEB-1024x577.jpg'; name = 'santa-isometrica-web.jpg' }
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
