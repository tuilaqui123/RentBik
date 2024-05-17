$(document).ready(function(){
   $("#btnTraCuu").on("click", function(){
      var bienSoXe = $("#bienSoXe").val();
      if (bienSoXe !== ""){
          getMaBhByBienSoXe(bienSoXe);
      }else{
          alert("Hãy nhập biển số xe");
      }
   });
   getInsurances();
});

function showAddCar(){
    var addCar = document.getElementById('addCar');
    addCar.classList.toggle("hidden");
}

// Thêm bảo hiểm xe
async function addInsurance(){
    var mabh = document.getElementById("mabh").value;
    var ngayMua = document.getElementById("ngayMua").value;
    var ngayHetHan = document.getElementById("ngayHetHanInput").value;
    var giaMua = document.getElementById("giaMua").value;
    
    if (mabh === ""){
        alert("Vui lòng nhập mã bảo hiểm");
        return;
    }
    
    if (ngayMua === ""){
        alert("Vui lòng nhập ngày mua");
        return;
    }
    
    if (ngayHetHan === ""){
        alert("Vui lòng nhập ngày hết hạn");
        return;
    }
    
    if (giaMua === ""){
        alert("Vui lòng nhập giá mua");
        return;
    }

    if (ngayHetHan < ngayMua){
        alert("Ngày hết hạn không được trước ngày mua");
        return;
    }
    
    if (isNaN(giaMua)){
        alert("Giá mua phải là giá trị số");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/insurances/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mabh: mabh,
            purchaseDate: ngayMua,
            expiredDate: ngayHetHan,
            purchasePrice: giaMua
        })
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "Mabh must be unique"){
            alert("Mã bảo hiểm không được trùng");
            return;
        }
        alert("Thêm bảo hiểm thành công");
    })
    .catch(err => console.log(err))
    .finally(async () => {
        location.reload();
    });
}
// Lấy danh sách bảo hiểm
 function getInsurances(){
    fetch('http://localhost:8080/api/v1/insurances',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(res => res.json())
    .then(data => {
        const tableBody = document.getElementById('tableInsurance');
        
        if (data.length === 0) {
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

                const properties = ['id', 'mabh', 'car', 'purchaseDate', 'expiredDate', 'purchasePrice'];
                properties.forEach(prop => {
                    const cell = document.createElement('td');
                    cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
                    if (!item[prop]){
                        cell.textContent = "Không có";
                    }else{
                        if (prop === 'car'){
                            cell.textContent = item[prop].licensePlate;
                        }else if (prop === 'purchaseDate' || prop === 'expiredDate'){
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
        }
    })
    .catch(err => console.log(err));
}

async function getMaBhByBienSoXe(searchInput){
    $.ajax({
        url: 'http://localhost:8080/api/v1/cars',
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            let licensePlateFound = false;
            let checkFound = false;
            data.forEach(car => {
                if (car.insurance !== null && car.licensePlate === searchInput){
                    $("#maBh").val(car.insurance.mabh);
                    const formattedDate = new Date(car.insurance.expiredDate).toLocaleDateString('en-GB');
                    $("#ngayHetHan").val(formattedDate);
                    licensePlateFound = true;
                }
                
                if (car.insurance === null && car.licensePlate === searchInput){
                    checkFound = true;
                }
            });
            if (!licensePlateFound && !checkFound){
                alert("Biển số xe không tồn tại");
                return;
            }
            
            if (!licensePlateFound && checkFound){
                alert("Xe chưa đăng ký bảo hiểm");
                return;
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}