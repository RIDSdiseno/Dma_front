param()

Write-Output "Creando carpeta destino si no existe..."
$destDir = Join-Path -Path $PSScriptRoot -ChildPath "..\src\assets"
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$images = @(
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/11/002-5-1024x576.jpg'; name = 'pieza-ninos-1.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/11/003-4-1024x576.jpg'; name = 'pieza-ninos-2.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/11/000-01-1024x576.jpg'; name = 'pieza-ninos-3.jpg' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2020/11/000-02-1024x576.jpg'; name = 'pieza-ninos-4.jpg' }
)

foreach ($it in $images) {
  $outPath = Join-Path -Path $destDir -ChildPath $it.name
  Write-Output ("Descargando {0} -> {1}" -f $it.url, $outPath)
  try {
    Invoke-WebRequest -Uri $it.url -OutFile $outPath -UseBasicParsing -ErrorAction Stop
    Write-Output "OK: $outPath"
  } catch {
    Write-Error "Fallo al descargar $($it.url): $($_.Exception.Message)"
  }
}

Write-Output "Descarga finalizada."
