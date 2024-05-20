$(document).ready(function(){
    $("#btnGetByCCCD").click(function(){
        var cccd = document.getElementById("cccd").value;

        if (cccd === ""){
            alert("Vui lòng nhập căn cước công dân");
            return;
        }
        
        getCustomers(cccd);
    });
});

// Lấy thông tin khách hàng theo cccd
async function getCustomers(cccd){
    await fetch(`http://localhost:8080/api/v1/customers/${cccd}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "CCCD doesn't exist"){
            alert("Căn cước công dân không tồn tại");
            location.reload();
            return;
        }
        
        var customerInfo = document.getElementById('customerInfo');
        customerInfo.classList.toggle("hidden");
        
        $("#tableHiringCar").empty();
        const tableBody = document.getElementById('tableHiringCar');
        let check = false;
        if (data.rents.length === 0) {
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');

            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.classList.add('px-6', 'py-4', 'font-bold', 'whitespace-nowrap', 'text-center', 'text-[30px]', 'text-[#Ef4444]');
            cell.textContent = 'Không có dữ liệu';

            row.appendChild(cell);
            tableBody.appendChild(row);
        }else{
            data.rents.forEach(item => {
                if (item.rentStatus === 'Dang thue'){
                    check = true;
                    const row = document.createElement('tr');
                    row.classList.add('bg-bone', 'border-b');

                    const properties = ['id', 'licensePlate', 'type', 'series', 'hirePrice', 'rentalDate', 'expiryDate'];
                    properties.forEach(prop => {
                        var objCar = item.car;
                        if (objCar){
                            const cell = document.createElement('td');
                            cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');

                            if (prop === 'type' || prop === 'series'){
                                cell.textContent = objCar[prop].name;
                            }else if (prop === 'rentalDate' || prop === 'expiryDate'){
                                const formattedDate = new Date(item[prop]).toLocaleDateString('en-GB');
                                cell.textContent = formattedDate;
                            }else{
                                cell.textContent = objCar[prop];
                            }

                            row.appendChild(cell);
                        }
                    });

                    tableBody.appendChild(row);
                }else {
                    check = false;
                }
            });
            
            if (!check){
                const row = document.createElement('tr');
                row.classList.add('bg-bone', 'border-b');

                const cell = document.createElement('td');
                cell.colSpan = 7;
                cell.classList.add('px-6', 'py-4', 'font-bold', 'whitespace-nowrap', 'text-center', 'text-[30px]', 'text-[#Ef4444]');
                cell.textContent = 'Không có dữ liệu';

                row.appendChild(cell);
                tableBody.appendChild(row);
            }
            
            document.getElementById("nameCustomer").innerHTML = data.fullname;
            const formattedDate = new Date(data.birthday).toLocaleDateString('en-GB');
            document.getElementById("birthdayCustomer").innerHTML = formattedDate;
            document.getElementById("phoneCustomer").innerHTML = data.phoneNumber;
            document.getElementById("gplxCustomer").innerHTML = data?.gplxes[0]?.rank;
            
            $("#bienSoXe").change(function(){
                if ($(this).val() !== ""){
                    getHirePriceByLicensePlate($(this).val(), data.cccd);
                }
                $("#tienThue").val("");
            });
            
            $("#ngayTra").change(async function(){
                var bienSoXe = $("#bienSoXe").val();
                var ngayTra = $(this).val();
                
                if (!bienSoXe){
                    alert("Vui lòng nhập biển số xe");
                    $(this).val(null);
                    return;
                }
                var carId = await getCarId(bienSoXe);
                getDetailHire(data.id, carId, ngayTra);
            });
            
            $("#saveReturnCard").click(async function(){
                await addReturnCard(data.cccd);
            });
        }
    })
    .catch(err => console.log(err));
}

// Lấy thông tin xe (tien thue) theo biển số xe và cccd
async function getHirePriceByLicensePlate(license_plate, cccd){
    $.ajax({
        url: `http://localhost:8080/api/v1/rents/get_detail_info?bsx=${license_plate}&cccd=${cccd}`,
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            if (data.message === "Car hasn't already hired for this customer"){
                $("#bienSoXe").val("");
                alert("Xe không được thuê");
                return;
            }
            
            if (data.message === "Car doesn't exist"){
                $("#bienSoXe").val("");
                alert("Xe không có trong kho");
                return;
            }
            
            $("#tienThue").val(data.car.hirePrice);
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

function getDetailHire(customerId, carId, returnDate){
    $.ajax({
        url: 'http://localhost:8080/api/v1/return_cards/hire_info_price',
        type: 'POST',
        data: JSON.stringify({
            customerId: customerId,
            carId: carId,
            returnDate: returnDate
        }),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            $("#tienPhat").val(response.finePrice);
            $("#tongTien").val(response.sumPrice);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Lấy thông tin thuê xe theo cccd và biển số xe
const getRentId = async (license_plate, cccd) =>{
    try {
        const response = await fetch(`http://localhost:8080/api/v1/rents/get_detail_info?bsx=${license_plate}&cccd=${cccd}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rentId = data.id;

        return rentId;

    } catch (err) {
        return null;
    }
};

// Lưu phiếu trả xe
async function addReturnCard(CCCD){
    var bienSoXe = $("#bienSoXe").val();
    if (!bienSoXe){
        alert("Vui lòng nhập biển số xe");
        return;
    }
    
    var ngayTra = $("#ngayTra").val();
    if (!ngayTra){
        alert("Vui lòng nhập ngày trả xe");
        return;
    }
    
    var ghiChu = $("#ghiChu").val();
    if (!ghiChu){
        alert("Vui lòng nhập thêm ghi chú");
        return;
    }
    
    var cccd = CCCD;
    var tienPhat = $("#tienPhat").val();
    var tongTien = $("#tongTien").val();
    var rentId = await getRentId(bienSoXe, cccd);
    
    fetch('http://localhost:8080/api/v1/return_cards/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rentId: rentId,
            finePrice: tienPhat,
            total: tongTien,
            returnDate: ngayTra,
            returnNote: ghiChu
        })
    })
    .then((res) => res.json())
    .then(data => {
        alert("Thêm phiếu trả xe thành công");
    })
    .catch(err => console.log(err))
    .finally(() => {
        location.reload();
    });
}