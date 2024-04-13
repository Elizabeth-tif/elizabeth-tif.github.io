@echo off
setlocal EnableDelayedExpansion

cd "C:\Users\Asus\OneDrive - Politeknik Negeri Bandung\Materi Kuliah\Semester 2\MK Proyek\Elizabeth-tif.github.io"
"C:\Users\Asus\OneDrive - Politeknik Negeri Bandung\Materi Kuliah\Semester 2\MK Proyek\Elizabeth-tif.github.io\scrapper.exe"
git add --all
git commit -am "Auto update"
git push origin main

exit /b %ERRORLEVEL%
