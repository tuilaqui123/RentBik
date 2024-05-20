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
        
//        getRentList(data.id);
        // bảng thuê xe
        $("#tableHiringCar").empty();
        const tableBodyHiringCar = document.getElementById('tableHiringCar');
        
        let checkHiring = false;
        if (data.rents.length === 0) {
            noDataInform(tableBodyHiringCar);
        }else{
            data.rents.forEach(item => {
                if (item.rentStatus === 'Dang thue'){
                    checkHiring = true;
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

                    tableBodyHiringCar.appendChild(row);
                }else {
                    checkHiring = false;
                }
            });
            
            if (!checkHiring){
                noDataInform(tableBodyHiringCar);
            }
        }
        
        // bảng trả xe
        $("#tableReturnedCar").empty();
        const tableBodyReturnedCar = document.getElementById('tableReturnedCar');
        
        let checkReturned = false;
        if (data.rents.length === 0) {
            noDataInform(tableBodyReturnedCar);
        }else{
            console.log(data);
            data.rents.forEach(item => {
                if (item.rentStatus === 'Da thanh toan'){
                    checkReturned = true;
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

                    tableBodyReturnedCar.appendChild(row);
                }else {
                    checkReturned = false;
                }
            });
            
            if (!checkReturned){
                noDataInform(tableBodyReturnedCar);
            }
        }
    })
    .catch(err => console.log(err));
}

// Lấy danh sách thuê xe
//function getRentList(customerId){
//    fetch('http://localhost:8080/api/v1/rents', {
//        method: "GET",
//        headers: {
//            "Content-Type": "application/json"
//        }
//    })
//    .then(res => res.json())
//    .then(data => {
//        $("#tableHiringCar").empty();
//        const tableBodyHiringCar = document.getElementById('tableHiringCar');
//        
//        let checkHiring = false;
//        if (data.length === 0) {
//            noDataInform(tableBodyHiringCar);
//        }else{
//            data.forEach(item => {
//                if (item.rentStatus === 'Dang thue'){
//                    checkHiring = true;
//                    const row = document.createElement('tr');
//                    row.classList.add('bg-bone', 'border-b');
//
//                    const properties = ['id', 'licensePlate', 'type', 'series', 'hirePrice', 'rentalDate', 'expiryDate'];
//                    properties.forEach(prop => {
//                        var objCar = item.car;
//                        if (objCar){
//                            const cell = document.createElement('td');
//                            cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
//
//                            if (prop === 'type' || prop === 'series'){
//                                cell.textContent = objCar[prop].name;
//                            }else if (prop === 'rentalDate' || prop === 'expiryDate'){
//                                const formattedDate = new Date(item[prop]).toLocaleDateString('en-GB');
//                                cell.textContent = formattedDate;
//                            }else{
//                                cell.textContent = objCar[prop];
//                            }
//
//                            row.appendChild(cell);
//                        }
//                    });
//
//                    tableBodyHiringCar.appendChild(row);
//                }else {
//                    checkHiring = false;
//                }
//            });
//            
//            if (!checkHiring){
//                noDataInform(tableBodyHiringCar);
//            }
//        }
//    })
//    .catch(err => console.log(err));
//}
