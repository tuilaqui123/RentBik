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

function showCustomerInfo(){
    var customerInfo = document.getElementById('customerInfo');
    customerInfo.classList.toggle("hidden");
}

function noDataInform(tableBody){
    const row = document.createElement('tr');
    row.classList.add('bg-bone', 'border-b');

    const cell = document.createElement('td');
    cell.colSpan = 7;
    cell.classList.add('px-6', 'py-4', 'font-bold', 'whitespace-nowrap', 'text-center', 'text-[30px]', 'text-[#Ef4444]');
    cell.textContent = 'Không có dữ liệu';

    row.appendChild(cell);
    tableBody.appendChild(row);
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
            location.reload();
            return;
        }
        
        var customerInfo = document.getElementById('customerInfo');
        customerInfo.classList.toggle("hidden");
        
        document.getElementById("nameCustomer").innerHTML = data.fullname;
        const formattedDate = new Date(data.birthday).toLocaleDateString('en-GB');
        document.getElementById("birthdayCustomer").innerHTML = formattedDate;
        document.getElementById("phoneCustomer").innerHTML = data.phoneNumber;
        document.getElementById("gplxCustomer").innerHTML = data?.gplxes[0]?.rank;
        
        getRentList(data.id);
        
        getReturnedCar(data.id);
    })
    .catch(err => console.log(err));
}

// Lấy danh sách thuê xe
function getRentList(customerId){
    fetch('http://localhost:8080/api/v1/rents', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        $("#tableHiringCar").empty();
        const tableBodyHiringCar = document.getElementById('tableHiringCar');
        
        let checkRent = false;
        if (data.length === 0) {
            noDataInform(tableBodyHiringCar);
        }else{
            data.forEach(item => {
                if (item.customer.id === customerId){
                    checkRent = true;
                    const row = document.createElement('tr');
                    row.classList.add('bg-bone', 'border-b');

                    const properties = ['id', 'licensePlate', 'type', 'series', 'rentalDate', 'expiryDate', 'rentStatus'];
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
                                if (prop === 'rentStatus'){
                                    cell.textContent = item[prop];
                                    cell.style.color  = (cell.textContent === 'Da thanh toan' ? 'green' : 'red');
                                }else if (prop === 'id'){
                                    cell.textContent = item[prop];
                                }else{
                                    cell.textContent = objCar[prop];
                                }
                            }

                            row.appendChild(cell);
                        }
                    });

                    tableBodyHiringCar.appendChild(row);
                }
            });
            
            if (!checkRent){
                noDataInform(tableBodyHiringCar);
            }
        }
    })
    .catch(err => console.log(err));
}

// bảng trả xe
function getReturnedCar(customerId){
    fetch('http://localhost:8080/api/v1/return_cards',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        $("#tableReturnedCar").empty();
        const tableBodyReturnedCar = document.getElementById('tableReturnedCar');
        
        let checkReturned = false;
        if (data.length === 0) {
            noDataInform(tableBodyReturnedCar);
        }else{
            data.forEach(item => {
                if (item.customer.id === customerId){
                    checkReturned = true;
                    const row = document.createElement('tr');
                    row.classList.add('bg-bone', 'border-b');

                    const properties = ['id', 'rent', 'returnedDate', 'fine', 'total'];
                    properties.forEach(prop => {
                        const cell = document.createElement('td');
                        cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');

                        if (prop === 'rent'){
                            cell.textContent = item[prop].id;
                        }else if (prop === 'returnedDate'){
                            const formattedDate = new Date(item[prop]).toLocaleDateString('en-GB');
                            cell.textContent = formattedDate;
                        }else{
                            cell.textContent = item[prop];
                        }
                        
                        row.appendChild(cell);
                    });

                    tableBodyReturnedCar.appendChild(row);
                }
            });
            
            if (!checkReturned){
                noDataInform(tableBodyReturnedCar);
            }
        }
    })
    .catch(err => console.log(err));
}