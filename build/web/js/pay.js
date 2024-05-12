$(document).ready(function(){
    getMaintenanceNoPayment();
    
    $("#btnTraCuu").on("click", function(){
      var bienSoXe = $("#bienSoXe").val();
      if (bienSoXe !== ""){
          getDetailCarByLicensePlate(bienSoXe);
      }else{
          alert("Hãy nhập biển số xe");
      }
    });
    
});

// Lấy chi tiết xe theo biển số xe
async function getDetailCarByLicensePlate(searchInput){
    $.ajax({
        url: 'http://localhost:8080/api/v1/cars',
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            data.forEach(car => {
                if (car.insurance !== null && car.licensePlate === searchInput){
                    $("#loaiXe").val(car.type.name);
                    $("#tenHang").val(car.brand.name);
                    $("#dongXe").val(car.series.name);
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Lấy phiếu bảo trì chưa thanh toán
function getMaintenanceNoPayment(){
    fetch('http://localhost:8080/api/v1/maintenances',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(res => res.json())
    .then(data => {
        const tableBody = document.getElementById('tableMaintenance');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');
            
            const properties = ['id', 'car', 'maintenanceDate', 'price', 'maintenanceNote'];
            properties.forEach(prop => {
                if (item.status === "Chua thanh toan"){
                    const cell = document.createElement('td');
                    cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
                    if (!item[prop]){
                        cell.textContent = "Không có";
                    }else{
                        if (prop === 'car'){
                            cell.textContent = item[prop].licensePlate;
                        }else if (prop === 'maintenanceDate'){
                            const formattedDate = new Date(item[prop]).toLocaleDateString('en-GB');
                            cell.textContent = formattedDate;
                        }else{
                            cell.textContent = item[prop];
                        }
                    }
                    row.appendChild(cell);
                }
            });

            tableBody.appendChild(row);
        });
    })
    .catch(err => console.log(err));
}