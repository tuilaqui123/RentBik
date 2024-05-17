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
                console.log(item);
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
            });
            
            document.getElementById("nameCustomer").innerHTML = data.fullname;
            const formattedDate = new Date(data.birthday).toLocaleDateString('en-GB');
            document.getElementById("birthdayCustomer").innerHTML = formattedDate;
            document.getElementById("phoneCustomer").innerHTML = data.phoneNumber;
            document.getElementById("gplxCustomer").innerHTML = data?.gplxes[0]?.rank;
        }
        
        
//        document.getElementById("hoTen").value = data.fullname;
//        document.getElementById("ngaySinh").value = formattedDate;
//        document.getElementById("soDienThoai").value = data.phoneNumber;
//        document.getElementById("gplx").value = data?.gplxes[0]?.rank;
//        
//        getCars();

    })
    .catch(err => console.log(err));
}