@echo off
setlocal EnableDelayedExpansion

cd "C:\Users\Asus\OneDrive - Politeknik Negeri Bandung\Materi Kuliah\Semester 2\MK Proyek\Elizabeth-tif.github.io"
git add --all

REM Get current timestamp
for /f "tokens=2" %%a in ('date /t') do set "_DATE=%%a"
for /f "tokens=1-3 delims=:" %%b in ('time /t') do set "_TIME=%%b:%%c"

git commit -am "Auto update at !_TIME! on !_DATE!"
git push origin main

exit /b %ERRORLEVEL%
