$(document).ready(function(){
    getReportCar();
});

function getReportCar(){
    fetch('http://localhost:8080/api/v1/reports/cars', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        $("#tableReportCar").empty();
        const tableBody = document.getElementById('tableReportCar');
        if (data.length === 0){
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');

            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.classList.add('px-6', 'py-4', 'font-bold', 'whitespace-nowrap', 'text-center', 'text-[30px]', 'text-[#Ef4444]');
            cell.textContent = 'Không có dữ liệu';

            row.appendChild(cell);
            tableBody.appendChild(row);
        }else {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('bg-bone', 'border-b');
                
                const properties = ['id', 'license_plate', 'mabh', 'type_car', 'series_car', 'rent_count', 'return_count', 'sum'];
                properties.forEach(prop => {
                    const cell = document.createElement('td');
                    cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
                    if (!item[prop] && item[prop]!==0){
                        cell.textContent = 'Khong co';
                    }else{
                        cell.textContent = item[prop];
                    }
                    
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });
        }
    })
    .catch(err => console.log(err));
}