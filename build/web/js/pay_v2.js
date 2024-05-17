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
            let licensePlateFound = false;
            data.forEach(car => {
                if (car.licensePlate === searchInput){
                    $("#loaiXe").val(car.type.name);
                    $("#tenHang").val(car.brand.name);
                    $("#dongXe").val(car.series.name);
                    licensePlateFound = true;
                }
            });
            
            if (!licensePlateFound){
                alert("Biển số xe không tồn tại");
                return;
            }
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

// Thanh toán bảo trì
async function paymentMaintenance(){
    var maBaoTri = document.getElementById("maBaoTri").value;
    var ngayThanhToan = document.getElementById("ngayThanhToan").value;
    var soTien = document.getElementById("soTien").value;
    
    if (maBaoTri === ""){
        alert("Vui lòng nhập mã bảo trì");
        return;
    }
    
    if (ngayThanhToan === ""){
        alert("Vui lòng chọn ngày thanh toán");
        return;
    }
    
    if (soTien === ""){
        alert("Vui lòng nhập số tiền thanh toán");
        return;
    }
    
    if (isNaN(maBaoTri)){
        alert("Mã bảo trì phải là giá trị số");
        return;
    }
    
    if (isNaN(soTien)){
        alert("Tiền phải là giá trị số");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/maintenances/pay',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            maintenanceId: maBaoTri,
            paymentDate: ngayThanhToan,
            price: soTien
        })
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "Maintenance is don't exists"){
            alert("Mã bảo trì không tồn tại");
            return;
        }
        
        if (data.message === "Payment price should not bigger than maintenance price"){
            alert("Giá thanh toán không được lớn hơn giá bảo trì");
            return;
        }
        
        alert("Thanh toán bảo trì thành công");
    })
    .catch(err => console.log(err))
    .finally(async () => {
        location.reload();
    });
}