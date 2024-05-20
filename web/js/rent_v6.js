$(document).ready(function(){
    $("#btnGetByCCCD").click(function(){
        var cccd = document.getElementById("cccd").value;

        if (cccd === ""){
            alert("Vui lòng nhập căn cước công dân");
            return;
        }

        getCustomers(cccd);

        $("#searchInput").keypress(function(event) {
            if (event.which === 13) {
                $("#btnSearch").click();
            }
        });

        $("#btnSearch").on("click", function(){
            var searchInput = $("#searchInput").val();
            getCarsBySearch(searchInput);
        });
        
    });
});

// Xem thông tin thuê xe
function showNewRenting(){
    var newRenting = document.getElementById('newRenting');
    var newButton = document.getElementById('newButton');
    if ( newRenting.classList.contains("hidden")){
        newButton.innerHTML = "Xoá phiếu thuê xe";
    } else newButton.innerHTML = "Lập phiếu thuê xe";
     newRenting.classList.toggle("hidden");
}

// Lấy danh sách xe
async function getCars() {
    fetch('http://localhost:8080/api/v1/cars/available')
        .then(res => res.json())
        .then(data => {
            $("#tableCar").empty();
            const tableBody = document.getElementById('tableCar');
            
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
                    row.classList.add('bg-bone', 'border-b', 'cursor-pointer', 'hover:bg-[#d7d9df]', 'selectedCar');

                    row.id = `${item.licensePlate}`;

                    const properties = ['id', 'licensePlate', 'type', 'series', 'hirePrice'];
                    properties.forEach(prop => {
                        if (item.status === "Co san"){
                            const cell = document.createElement('td');
                            cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');

                            if (prop === 'type' || prop === 'series') {
                                cell.textContent = item[prop].name;
                            } else {
                                cell.textContent = item[prop];
                            }
                            row.appendChild(cell);
                        }
                    });

                    tableBody.appendChild(row);
                });
            }
            
            $(".selectedCar").on('click', function(){
                var licensePlate = $(this).attr('id');
                document.getElementById("selectCar").innerHTML = `XE ĐÃ CHỌN: ${licensePlate}`;
                getDetailCarByLicensePlate(licensePlate);
            });
            
            $("#bienSoXe").change(function(){
                getTypeAndSeriesByLP($(this).val());
            });
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
}

// Lấy danh sách xe theo điều kiện search
async function getCarsBySearch(searchInput){
    await fetch(`http://localhost:8080/api/v1/cars/searchAvailable?keyword=${searchInput}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        $("#tableCar").empty();
        const tableBody = document.getElementById('tableCar');
        
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
                row.classList.add('bg-bone', 'border-b', 'cursor-pointer', 'hover:bg-[#d7d9df]', 'selectedCar');

                row.id = `${item.licensePlate}`;

                const properties = ['id', 'licensePlate', 'type', 'series', 'hirePrice'];
                properties.forEach(prop => {
                    const cell = document.createElement('td');
                    cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');

                    if (prop === 'type' || prop === 'series'){
                        cell.textContent = item[prop].name;
                    }else{
                        cell.textContent = item[prop];
                    }
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        }
        
        $(".selectedCar").on('click', function(){
            var licensePlate = $(this).attr('id');
            document.getElementById("selectCar").innerHTML = `XE ĐÃ CHỌN: ${licensePlate}`;
            getDetailCarByLicensePlate(licensePlate);
        });

        $("#bienSoXe").change(function(){
            getTypeAndSeriesByLP($(this).val());
        });
    })
    .catch(err => console.log(err));
}

// Lấy thông tin xe (loại xe, dòng xe) theo biển số xe được chọn từ bảng
async function getDetailCarByLicensePlate(license_plate){
    $.ajax({
        url: 'http://localhost:8080/api/v1/cars',
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            data.forEach(car => {
                if (car.licensePlate === license_plate){
                    $("#bienSoXe").val(car.licensePlate);
                    $("#loaiXe").val(car.type.name);
                    $("#dongXe").val(car.series.name);
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Lấy thông tin xe (loại xe, dòng xe) theo biển số xe
async function getTypeAndSeriesByLP(license_plate){
    $.ajax({
        url: 'http://localhost:8080/api/v1/cars',
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            data.forEach(car => {
                if (car.licensePlate === license_plate){
                    $("#loaiXe").val(car.type.name);
                    $("#dongXe").val(car.series.name);
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

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
            return;
        }
        
        var customerInfo = document.getElementById('customerInfo');
        customerInfo.classList.toggle("hidden");
        var newRenting = document.getElementById('newRenting');
        if (!newRenting.classList.contains("hidden")){
            newRenting.classList.toggle("hidden");
        }
        
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
        }
        
        document.getElementById("nameCustomer").innerHTML = data.fullname;
        const formattedDate = new Date(data.birthday).toLocaleDateString('en-GB');
        document.getElementById("birthdayCustomer").innerHTML = formattedDate;
        document.getElementById("phoneCustomer").innerHTML = data.phoneNumber;
        document.getElementById("gplxCustomer").innerHTML = data?.gplxes[0]?.rank;
        
        document.getElementById("hoTen").value = data.fullname;
        document.getElementById("ngaySinh").value = formattedDate;
        document.getElementById("soDienThoai").value = data.phoneNumber;
        document.getElementById("gplx").value = data?.gplxes[0]?.rank;
        
        getCars();

    })
    .catch(err => console.log(err));
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

// Lấy id khách hàng theo tên khách hàng
const getCustomerID = async (soDienThoaiInput) => {
    var customerId;
    
    await fetch('http://localhost:8080/api/v1/customers', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            if (item.phoneNumber === soDienThoaiInput){
                customerId = item.id;
            }
        });
    })  
    .catch(err => console.log(err));
    
    return customerId;
};

// Thêm phiếu thuê xe
async function addRetingCar(){
    var soDienThoai = document.getElementById("soDienThoai").value;
    var customerId = await getCustomerID(soDienThoai);
    
    var bienSoXe = document.getElementById("bienSoXe").value;
    var carId = await getCarId(bienSoXe);
    
    if (carId === undefined){
        alert("Hãy chọn xe thuê từ danh sách xe trong kho");
        return;
    }
    
    var ngayThueXe = document.getElementById("ngayThueXe").value;
    
    if (ngayThueXe === ""){
        alert("Vui lòng chọn ngày thuê xe");
        return;
    }
    
    var ngayTraXe = document.getElementById("ngayTraXe").value;
    
    if (ngayTraXe === ""){
        alert("Vui lòng chọn ngày trả xe");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/rents/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carId: carId,
            customerId: customerId,
            expiredDate: ngayTraXe,
            rentalDate: ngayThueXe
        })
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "Car or customer not found"){
            alert("Xe hoặc khách hàng không tồn tại");
            return;
        }
        alert("Thêm phiếu thuê xe thành công");
    })
    .catch(err => console.log(err))
    .finally(async () => {
        location.reload();
    });
}