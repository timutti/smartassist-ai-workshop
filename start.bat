@echo off
REM SmartAssist AI — rychlé spuštění
REM Pro workshop "Vibecoding v project managementu"

echo ==========================================
echo   SmartAssist AI — spouštím projekt...
echo ==========================================
echo.

where uv >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Instaluji uv...
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
)

echo Instaluji závislosti...
uv sync

echo.
echo ==========================================
echo   Spouštím server na http://localhost:8000
echo   Ukoncite pomoci Ctrl+C
echo ==========================================
echo.

uv run fastapi dev src/smartassist/main.py
