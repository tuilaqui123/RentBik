$(document).ready(function(){
    getReportCustomer();
});

function getReportCustomer(){
    fetch('http://localhost:8080/api/v1/reports/customers', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        $("#tableReportCustomer").empty();
        const tableBody = document.getElementById('tableReportCustomer');
        
        if (data.length === 0){
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');

            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.classList.add('px-6', 'py-4', 'font-bold', 'whitespace-nowrap', 'text-center', 'text-[30px]', 'text-[#Ef4444]');
            cell.textContent = 'Không có dữ liệu';

            row.appendChild(cell);
            tableBody.appendChild(row);
        }else{
            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('bg-bone', 'border-b');
                
                const properties = ['makh', 'name', 'rents', 'returns', 'hiring_cars', 'returned_cars', 'sum_rent'];
                properties.forEach(prop => {
                    const cell = document.createElement('td');
                    cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
                    cell.textContent = item[prop];
                    
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });
        }
    })
    .catch(err => console.log(err));
}