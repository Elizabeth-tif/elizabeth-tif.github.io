const mntoggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

mntoggle.addEventListener('click', function () {
    nav.classList.toggle('menushow');
})

document.addEventListener("DOMContentLoaded", function () {
    var tableRows = document.querySelectorAll("#News table tr:not(:first-child)");
    tableRows.forEach(function (row) {
        row.addEventListener("click", function () {
            var link = row.cells[1].querySelector("a").href;
            window.open(link, "_blank");
        });
    });
});
