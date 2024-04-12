// Define menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('menushow');
});

function insertDataScrap() {
    fetch('headlines.json')
        .then(response => response.json())
        .then(data => {
            // Initialize DataTable
            $('#scrapping-table').DataTable({
                // DataTable options here
            });

            // Insert data into DataTable
            data.forEach((obj, index) => {
                $('#scrapping-table').DataTable().row.add([
                    index + 1,
                    obj.headline,
                    obj.category,
                    obj.publish_time,
                    obj.storing_time
                ]);
            });

            // Redraw DataTable
            $('#scrapping-table').DataTable().draw();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', insertDataScrap);
