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
    fetch('http://localhost:8080/api/v1/cars')
        .then(res => res.json())
        .then(data => {
            $("#tableCar").empty();
            const tableBody = document.getElementById('tableCar');
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
    await fetch(`http://localhost:8080/api/v1/cars/search?keyword=${searchInput}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        $("#tableCar").empty();
        const tableBody = document.getElementById('tableCar');
        
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
        console.log(data);
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