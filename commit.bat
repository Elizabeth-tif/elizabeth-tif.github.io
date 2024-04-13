@echo off
setlocal EnableDelayedExpansion

cd "C:\Users\Asus\OneDrive - Politeknik Negeri Bandung\Materi Kuliah\Semester 2\MK Proyek\Elizabeth-tif.github.io"
git "add" "--all"
SET _INTERPOLATION_0=
FOR /f "delims=" %%a in ('timestamp') DO (SET "_INTERPOLATION_0=!_INTERPOLATION_0! %%a")
git "commit" "-am" "Auto update !_INTERPOLATION_0:~1!"
git "push" "origin" "main"

EXIT /B %ERRORLEVEL%

:timestamp
date "+at %H:%M:%S on %d/%m/%Y"
EXIT /B 0