@REM Script para hacer push a GitHub sin problemas en Windows
@echo off

echo.
echo ========================================
echo   SINCRONIZACION CON GITHUB
echo   Blog Simple - Push a Database Branch
echo ========================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist ".git" (
    echo ERROR: No se encontro repositorio Git en este directorio
    pause
    exit /b 1
)

REM Mostrar estado actual
echo [1/3] Estado actual del repositorio:
git status
echo.

REM Mostrar commits
echo [2/3] Ultimos commits:
git log --oneline -3
echo.

REM Hacer push
echo [3/3] Sincronizando con GitHub...
echo.

REM Intentar push normal
git push -u origin database

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   EXITO! Cambios sincronizados a GitHub
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo   ERROR! No se pudo hacer push
    echo ========================================
    echo.
    echo Posibles soluciones:
    echo 1. Verifica tu conexion a internet
    echo 2. Configura credenciales de GitHub
    echo 3. Lee el archivo GITHUB_SYNC.md
    echo 4. Intenta: git push -f origin database
    echo.
)

pause
