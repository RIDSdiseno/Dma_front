# Download carousel images from dm-a.cl and generate WebP variants
# Usage: run in project root (Dma_front) with PowerShell

$outDir = "src/assets"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$images = @(
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/04/IM_02-1024x576.jpg'; name = 'carousel-01' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2023/04/PORTADA-ISLA-MAIPO-e1681434396379-1024x644.jpg'; name = 'carousel-02' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2011/09/Imagen-0-1024x739.png'; name = 'carousel-03' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2011/09/Imagen-1-1024x576.jpg'; name = 'carousel-04' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2011/09/imagen-2-1024x576.jpg'; name = 'carousel-05' },
  @{ url = 'https://dm-a.cl/wp-content/uploads/2011/09/imagen-3-1024x576.jpg'; name = 'carousel-06' }
)

Write-Output "Downloading images to $outDir ..."
foreach ($img in $images) {
  $dest = Join-Path $outDir ($img.name + (Split-Path $img.url -Leaf))
  # Normalize filename: keep extension from URL
  $ext = [System.IO.Path]::GetExtension($img.url)
  $outfile = Join-Path $outDir ($img.name + $ext)
  Write-Output "- Downloading $($img.url) -> $outfile"
  Invoke-WebRequest -Uri $img.url -OutFile $outfile -UseBasicParsing
}

Write-Output "Conversion: creating WebP variants using npx sharp if available."
if (Get-Command npx -ErrorAction SilentlyContinue) {
  foreach ($img in Get-ChildItem -Path $outDir -Include "carousel-*.*" -File) {
    $src = $img.FullName
    $webp = [System.IO.Path]::Combine($outDir, [System.IO.Path]::GetFileNameWithoutExtension($img.Name) + '.webp')
    Write-Output "- Converting $src -> $webp"
    # quality 80 for good balance
    powershell -NoProfile -Command "npx sharp '$src' --webp --quality 80 -o '$webp'" | Out-Null
  }
} else {
  Write-Warning "npx not found. Install Node.js and run 'npm i sharp' or install ImageMagick to convert images to WebP."
}

Write-Output "Done. Imported files live under $outDir. Next: run the dev server (npm run dev) and verify the carousel uses the local images." 
