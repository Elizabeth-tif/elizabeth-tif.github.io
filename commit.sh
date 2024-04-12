#!/bin/sh
cd C://Users//Asus//OneDrive/ -/ Politeknik/ Negeri/ Bandung//Materi/ Kuliah//Semester/ 2//MK/ Proyek//Elizabeth-tif.github.io
git add --all
timestamp() {
  date +"at %H:%M:%S on %d/%m/%Y"
}
git commit -am "Auto update $(timestamp)"
git push origin main