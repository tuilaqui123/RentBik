$(document).ready(function(){
    getMaintenance();
    $("#btnTraCuu").on("click", function(){
      var bienSoXe = $("#bienSoXe").val();
      if (bienSoXe !== ""){
          getDetailCarByLicensePlate(bienSoXe);
      }else{
          alert("Hãy nhập biển số xe");
      }
    });
    
    $("#searchInput").keypress(function(event) {
        if (event.which === 13) {
            $("#btnSearch").click();
        }
    });
    
    $("#btnSearch").on("click", function(){
        var searchInput = $("#searchInput").val();
        getMaintenanceBySearch(searchInput);
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

// Lấy id xe theo biển số xe
const getCarId = async (bienSoXeInput) => {
    var carId;
    
    await fetch('http://localhost:8080/api/v1/cars', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        } 
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            if (item.licensePlate === bienSoXeInput){
                carId = item.id;
            }
        });
    })  
    .catch(err => console.log(err));
    
    return carId;
};

// Thêm phiếu bảo trì xe mới
async function addMaintenance(){
    var bienSoXeInput = document.getElementById("bienSoXeInput").value;
    var ngayBaoTriInput = document.getElementById("ngayBaoTriInput").value;
    var ghiChuInput = document.getElementById("ghiChuInput").value;  
    var giaBaoTri = document.getElementById("giaBaoTri").value;
    var carId = await getCarId(bienSoXeInput);

    if (bienSoXeInput === ""){
        alert("Vui lòng nhập biển số xe");
        return;
    }
    
    if (ngayBaoTriInput === ""){
        alert("Vui lòng nhập ngày bảo trì");
        return;
    }
    
    if (ghiChuInput === ""){
        alert("Vui lòng nhập ghi chú");
        return;
    }

    if (giaBaoTri === ""){
        alert("Vui lòng nhập giá bảo trì");
        return;
    }
    
    if (!carId){
        alert("Biển số xe không tồn tại");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/maintenances/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carId: carId,
            maintenanceDate: ngayBaoTriInput,
            maintenanceNote: ghiChuInput,
            price: giaBaoTri
        })
    })
    .then((res) => res.json())
    .then(data => {
        alert("Thêm phiếu bảo trì thành công");
    })
    .catch(err => console.log(err))
    .finally(async () => {
        location.reload();
    });
}

// Lấy danh sách phiếu bảo trì
function getMaintenance(){
    fetch('http://localhost:8080/api/v1/maintenances',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(res => res.json())
    .then(data => {
        const tableBody = document.getElementById('tableMaintenance');
        console.log(data);
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');
            
            const properties = ['id', 'car', 'maintenanceDate', 'status', 'maintenanceNote'];
            properties.forEach(prop => {
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
            });

            tableBody.appendChild(row);
        });
    })
    .catch(err => console.log(err));
}

// Lấy danh sách phiếu bảo trì theo kewword
async function getMaintenanceBySearch(searchInput){
    await fetch(`http://localhost:8080/api/v1/maintenances/search?keyword=${searchInput}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        } 
    })
    .then(res => res.json())
    .then(data => {
        $("#tableMaintenance").empty();
        const tableBody = document.getElementById('tableMaintenance');
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');
            
            const properties = ['id', 'car', 'maintenanceDate', 'status', 'maintenanceNote'];
            properties.forEach(prop => {
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
            });

            tableBody.appendChild(row);
        });
    })
    .catch(err => console.log(err));
}