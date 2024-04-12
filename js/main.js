const mntoggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

mntoggle.addEventListener('click', function () {
    nav.classList.toggle('menushow');
})

function insertDataScrap() {
    fetch('headlines.json')
        .then(response => response.json())
        .then(data => {
            var table = $('#news-table').DataTable();
            data.forEach((obj, index) => {
                table.row.add([
                    index + 1,
                    obj.headline,
                    obj.category,
                    obj.publish_time,
                    obj.storing_time
                ]);
            });
            table.draw();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', insertDataScrap);

$('#news-table').on('draw.dt', function () {
    $('#news-table td').css('text-align', 'center', 'border', '1px solid #b784b7');
});
