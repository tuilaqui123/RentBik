$(document).ready(function(){
    getBrands();
    
    $("#iconThemTenHang").on('click', function(){
        addBrand();
    });
    
    $("#iconTimTenHang").on('click', function(){
        var searchInput = document.getElementById("timTenHang").value;
        getBrandByName(searchInput);
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

// Lấy danh sách hãng xe
async function getBrands(){
    fetch('http://localhost:8080/api/v1/brands',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const listBrand = document.getElementById("listBrand");
        data.forEach(brand => {
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