const mntoggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

mntoggle.addEventListener('click', function () {
    nav.classList.toggle('menushow');
})

$(document).ready(function () {
    const mntoggle = $('.menu-toggle input');
    const nav = $('nav ul');

    mntoggle.on('click', function () {
        nav.toggleClass('menushow');
    });

    function insertDataScrap() {
        $.getJSON('headlines.json')
            .done(function (data) {
                var table = $('#news-table').DataTable({
                    "columnDefs": [
                        {"className": "dt-center", "targets": "_all"}
                    ],
                    "drawCallback": function () {
                        $('#news-table td').css('border', '1px solid #b784b7', 'z-index', '1');
                    }
                });

                data.forEach(function (obj, index) {
                    table.row.add([
                        index + 1,
                        obj.headline,
                        obj.category,
                        obj.waktu_publish,
                        obj.storing_time
                    ]).draw(false);
                });
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
            });
    }

    insertDataScrap();
});
