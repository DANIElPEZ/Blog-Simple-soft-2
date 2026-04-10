# Script de PowerShell para sincronizar con GitHub
# Uso: .\push.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SINCRONIZACION CON GITHUB" -ForegroundColor Cyan
Write-Host "   Blog Simple - Push a Database Branch" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en un repositorio Git
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: No se encontro repositorio Git en este directorio" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Mostrar estado
Write-Host "[1/3] Estado actual del repositorio:" -ForegroundColor Yellow
git status
Write-Host ""

# Mostrar commits recientes
Write-Host "[2/3] Ultimos commits:" -ForegroundColor Yellow
git log --oneline -3
Write-Host ""

# Hacer push
Write-Host "[3/3] Sincronizando con GitHub..." -ForegroundColor Yellow
Write-Host ""

$result = git push -u origin database 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   EXITO! Cambios sincronizados a GitHub" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "El proyecto esta listo en:" -ForegroundColor Green
    Write-Host "https://github.com/Juancho5945/Blog-Simple-soft-2/tree/database" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   ERROR! No se pudo hacer push" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "1. Verifica tu conexion a internet"
    Write-Host "2. Configura credenciales de GitHub"
    Write-Host "3. Lee el archivo GITHUB_SYNC.md"
    Write-Host "4. Intenta: git push -f origin database"
    Write-Host ""
    Write-Host "Detalles del error:" -ForegroundColor Red
    Write-Host $result
    Write-Host ""
}

Write-Host "Presiona Enter para salir..."
Read-Host
