// Define menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('menushow');
});

// Fetch and insert data from headlines.json
function insertDataScrap() {
    fetch('headlines.json')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('scrapping-table');

            data.forEach((obj, index) => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${obj.headline}</td>
                    <td>${obj.category}</td>
                    <td>${obj.publish_time}</td>
                    <td>${obj.storing_time}</td>
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', insertDataScrap);
