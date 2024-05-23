$(document).ready(function(){
    alert("okeoke");
    getBrands();
    getSeries();
    getTypes();
    getInsurances();
    getInsurancesForBSX();
    getCars();
    getBienSoXeWithNoInsurance();
    getBienSoXe('update');
    getBienSoXe('delete');
    $("#iconThemTenHang").on('click', function(){
        addBrand();
    });
    
    $("#iconThemDongXe").on('click', function(){
        addSeries();
    });
    
    $("#iconTimDongXe").on('click', function(){
        var searchInput = document.getElementById("tenDongXe").value;
        getSeriesByName(searchInput);
    });
    
    $("#iconTimTenHang").on('click', function(){
        var searchInput = document.getElementById("timTenHang").value;
        getBrandByName(searchInput);
    });
    
    $("#selectedInsurance").change(function(){
      var id = $(this).val();
      getExpireDateByMabh(id);
    });
    
    $("#searchInput").keypress(function(event) {
        if (event.which === 13) {
            $("#btnSearch").click();
        }
    });
    
    $("#btnSearch").on("click", function(){
        var searchInput = $("#searchInput").val();
        getCarsBySearch(searchInput);
    });
    
    $("#updateSelectedBXS").change(function(){
        var carId = $(this).val();
        getInfoCarById(carId, 'update');
    });
    
    $("#deleteSelectedBXS").change(function(){
        var carId = $(this).val();
        getInfoCarById(carId, 'delete');
    });
});

function showAddCar(){
    var addCar = document.getElementById('addCar');
    addCar.classList.toggle("hidden");
}

function showAddBrand(){
    var addBrand = document.getElementById('addBrand');
    addBrand.classList.toggle("hidden");
}

function showAddSeries(){
    var addSeries = document.getElementById('addSeries');
    addSeries.classList.toggle("hidden");
}

function showAddInsurance(){
    var addInsurance = document.getElementById('addInsurance');
    addInsurance.classList.toggle("hidden");
}

function showUpdateCar(){
    var updateCar = document.getElementById('updateCar');
    updateCar.classList.toggle("hidden");
}

function showDeleteCar(){
    var deleteCar = document.getElementById('deleteCar');
    deleteCar.classList.toggle("hidden");
}

// Lấy danh sách hãng xe
async function getBrands(){
    var brands = document.getElementById("selectedBrand");
    
    fetch('http://localhost:8080/api/v1/brands',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        const listBrand = document.getElementById("listBrand");
        data.forEach(brand => {
            var optionElement = document.createElement("option");
            optionElement.text = brand.name;
            optionElement.value = brand.id;
            brands.add(optionElement);
            
            const p = document.createElement('p');
            p.classList.add('mt-3');
            p.textContent = brand.name;
            listBrand.appendChild(p);
        });
    })
    .catch(err => console.log(err));
}

// Lấy danh sách hãng xe theo tên
async function getBrandByName(searchInput){
    $.ajax({
        url: 'http://localhost:8080/api/v1/brands',
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            data.forEach(brand => {
                const listBrand = $("#listBrand");
                listBrand.empty(); 
                
                if (!searchInput) {
                    data.forEach(brand => {
                        const p = $("<p>").addClass('mt-3').text(brand.name);
                        listBrand.append(p);
                    });
                } else {
                    data.forEach(brand => {
                        if (brand.name === searchInput) {
                            const p = $("<p>").addClass('mt-3').text(brand.name);
                            listBrand.append(p);
                        }
                    });
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Thêm hãng xe
async function addBrand(){
    var inputBrand = document.getElementById("themTenHang").value;
    
    if (inputBrand === ""){
        alert("Vui lòng nhập tên hãng xe");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/brands/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputBrand
        })
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "Name must be unique"){
            alert("Tên hãng xe không được trùng");
            return;
        }
        alert("Thêm hãng xe thành công");
    })
    .catch(err => console.log(err))
    .finally(() => {
        showAddBrand(); 
        location.reload();
    });
}

// Lấy danh sách dòng xe
async function getSeries(){
    var selectedSeries = document.getElementById("selectedSeries");
    
    fetch('http://localhost:8080/api/v1/series',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        const listSeries = document.getElementById("listSeries");
        data.forEach(series => {
            var optionElement = document.createElement("option");
            optionElement.text = series.name;
            optionElement.value = series.id;
            selectedSeries.add(optionElement);
            
            const p = document.createElement('p');
            p.classList.add('mt-3');
            p.textContent = series.name;
            listSeries.appendChild(p);
        });
    })
    .catch(err => console.log(err));
}

// Thêm dòng xe
async function addSeries(){
    var inputSeries = document.getElementById("themDongXe").value;
    
    if (inputSeries === ""){
        alert("Vui lòng nhập tên dòng xe");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/series/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputSeries
        })
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "Name must be unique"){
            alert("Tên dòng xe không được trùng");
            return;
        }
        alert("Thêm dòng xe thành công");
    })
    .catch(err => console.log(err))
    .finally(() => {
        showAddSeries(); 
        location.reload();
    });
}

// Lấy danh sách dòng xe theo tên
async function getSeriesByName(searchInput){
    $.ajax({
        url: 'http://localhost:8080/api/v1/series',
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            data.forEach(series => {
                const listSeries = $("#listSeries");
                listSeries.empty(); 
                
                if (!searchInput) {
                    data.forEach(series => {
                        const p = $("<p>").addClass('mt-3').text(series.name);
                        listSeries.append(p);
                    });
                } else {
                    data.forEach(series => {
                        if (series.name === searchInput) {
                            const p = $("<p>").addClass('mt-3').text(series.name);
                            listSeries.append(p);
                        }
                    });
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Lấy danh sách loại xe
async function getTypes(){
    var types = document.getElementById("selectedType");
    
    await fetch('http://localhost:8080/api/v1/types',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(type => {
            var optionElement = document.createElement("option");
            optionElement.text = type.name;
            optionElement.value = type.id;
            types.add(optionElement);
        });
    })
    .catch(err => console.log(err));
}

// Lấy danh sách bảo hiểm chưa thuộc xe nào
async function getInsurances(){
    var insurances = document.getElementById("selectedInsurance");
    
    var defaultOption = document.createElement("option");
    defaultOption.text = "Mã bảo hiểm";
    defaultOption.value = "";
    defaultOption.selected = true; 
    defaultOption.disabled = true;
    insurances.appendChild(defaultOption);
    
    fetch('http://localhost:8080/api/v1/insurances',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(insurance => {
            if (!insurance.car){
                var optionElement = document.createElement("option");
                optionElement.text = insurance.mabh;
                optionElement.value = insurance.id;
                insurances.add(optionElement);
            }
        });
    })
    .catch(err => console.log(err));
}

// Lấy ngày hết hạn theo mã bảo hiểm
function getExpireDateByMabh(id){
    $.ajax({
        url: `http://localhost:8080/api/v1/insurances/${id}`,
        method: 'GET',
        contentType: 'application/json',
        success: function(data) {
            $("#ngayHetHan").val(data.expiredDate);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Thêm xe mới
async function addCar(){
    var bienSoXe = document.getElementById("bienSoXe").value;
    var selectedType = document.getElementById("selectedType").value;
    var selectedBrand = document.getElementById("selectedBrand").value;
    var selectedSeries = document.getElementById("selectedSeries").value;
    var giaMua = document.getElementById("giaMua").value;
    var ngayMua = document.getElementById("ngayMua").value;
    var selectedInsurance = document.getElementById("selectedInsurance").value;
    var ghiChu = document.getElementById("ghiChu").value;
    
    if (bienSoXe === ""){
        alert("Vui lòng nhập biển số xe");
        return;
    }
    
    if (selectedType === ""){
        alert("Vui lòng nhập loại xe");
        return;
    }
    
    if (selectedBrand === ""){
        alert("Vui lòng nhập hãng xe");
        return;
    }
    
    if (selectedSeries === ""){
        alert("Vui lòng nhập dòng xe");
        return;
    }
    
    if (giaMua === ""){
        alert("Vui lòng nhập giá mua");
        return;
    }
    
    if (ngayMua === ""){
        alert("Vui lòng nhập ngày mua");
        return;
    }
    
    if (ghiChu === ""){
        alert("Vui lòng nhập ghi chú");
        return;
    }
    
    await fetch('http://localhost:8080/api/v1/cars/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            licensePlate: bienSoXe,
            typeId: selectedType,
            brandId: selectedBrand,
            seriesId: selectedSeries,
            insuranceId: selectedInsurance,
            purchasePrice: giaMua,
            purchaseDate: ngayMua,
            carNote: ghiChu
        })
    })
        .then((res) => res.json())
        .then(data => {
            if (data.message === "License plate must be unique"){
                alert("Biển số xe không được trùng");
                return;
            }
            alert("Thêm xe thành công");
            showAddCar();
        })
        .catch(err => console.log(err))
        .finally(async () => {
            location.reload();
        });
}

// Lấy danh sách xe
async function getCars(){
    await fetch('http://localhost:8080/api/v1/cars',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
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
                row.classList.add('bg-bone', 'border-b');

                const properties = ['id', 'licensePlate', 'status', 'type', 'series', 'hirePrice', 'carNote'];
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
        
    })
    .catch(err => console.log(err));
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

                const properties = ['id', 'licensePlate', 'status', 'type', 'series', 'hirePrice', 'carNote'];
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
    })
    .catch(err => console.log(err));
}

// Lấy danh sách biển số xe chưa đăng ký bảo hiểm
async function getBienSoXeWithNoInsurance(){
    var licensePlates = document.getElementById("selectedBSX");
    
    var defaultOption = document.createElement("option");
    defaultOption.text = "Biển số xe";
    defaultOption.value = "";
    defaultOption.selected = true; 
    defaultOption.disabled = true;
    licensePlates.appendChild(defaultOption);
    
    fetch('http://localhost:8080/api/v1/cars/insuranceNotFound',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(licensePlate => {
            var optionElement = document.createElement("option");
            optionElement.text = licensePlate.licensePlate;
            optionElement.value = licensePlate.id;
            licensePlates.add(optionElement);
        });
    })
    .catch(err => console.log(err));
}

// Lấy bảo hiểm trong form thêm bảo hiểm mới
async function getInsurancesForBSX(){
    var insurances = document.getElementById("selectedInsuranceForBSX");
    
    var defaultOption = document.createElement("option");
    defaultOption.text = "Mã bảo hiểm";
    defaultOption.value = "";
    defaultOption.selected = true; 
    defaultOption.disabled = true;
    insurances.appendChild(defaultOption);
    
    fetch('http://localhost:8080/api/v1/insurances',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }  
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(insurance => {
            if (!insurance.car){
                var optionElement = document.createElement("option");
                optionElement.text = insurance.mabh;
                optionElement.value = insurance.id;
                insurances.add(optionElement);
            }
        });
    })
    .catch(err => console.log(err));
}

// Thêm bảo hiểm cho xe đã có trong kho
async function addInsuranceForExistCar(){
    var selectedBSX = document.getElementById("selectedBSX").value;
    var selectedInsurance = document.getElementById("selectedInsuranceForBSX").value;
    
    if (selectedBSX === ""){
        alert("Vui lòng chọn biển số xe");
        return;
    }
    
    if (selectedInsurance === ""){
        alert("Vui lòng chọn bảo hiểm xe");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/cars/add_insurance', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carId: selectedBSX,
            insuranceId: selectedInsurance
        })
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "Car or insurance not found"){
            alert("Xe hoặc bảo hiểm không tồn tại");
            return;
        }
        alert("Thêm bảo hiểm thành công");
    })
    .catch(err => console.log(err))
    .finally(() => {
        location.reload();
    });
}

// Lấy danh sách biển số xe
async function getBienSoXe(method){
    var mabhs = (method === 'update' ? document.getElementById("updateSelectedBXS") : document.getElementById("deleteSelectedBXS"));
    
    var defaultOption = document.createElement("option");
    defaultOption.text = "Biển số xe";
    defaultOption.value = "";
    defaultOption.selected = true; 
    defaultOption.disabled = true;
    mabhs.appendChild(defaultOption);
    
    await fetch('http://localhost:8080/api/v1/cars', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(option => {
            var optionElement = document.createElement("option");
            optionElement.text = option.licensePlate;
            optionElement.value = option.id;
            mabhs.add(optionElement);
        });
    })
    .catch(err => console.log(err));
}

// Lấy thông tin xe theo id
async function getInfoCarById(car_id, method){
    await fetch(`http://localhost:8080/api/v1/cars/${car_id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (method === 'update'){
            $("#updateBSX").val(data.licensePlate);
            $('#updateBSX').removeAttr('disabled');

            $("#updateNgayMua").val(data.purchaseDate);
            $('#updateNgayMua').removeAttr('disabled');

            $("#updateGiaXe").val(data.purchasePrice);
            $('#updateGiaXe').removeAttr('disabled');

            $("#updateGhiChu").val(data.carNote);
            $('#updateGhiChu').removeAttr('disabled');
        }else{
            console.log(data);
            $("#deleteSelectedBXS").val(data.id);

            $("#deleteNgayMua").val(data.purchaseDate);

            $("#deleteGiaXe").val(data.purchasePrice);

            $("#deleteGhiChu").val(data.carNote);
        }
    })
    .catch(err => console.log(err));
}