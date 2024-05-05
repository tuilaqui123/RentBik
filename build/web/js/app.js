function showCustomerInfo(){
    var customerInfo = document.getElementById('customerInfo');
    customerInfo.classList.toggle("hidden");
}
function showNewRenting(){
    var newRenting = document.getElementById('newRenting');
    var newButton = document.getElementById('newButton');
    if ( newRenting.classList.contains("hidden")){
        newButton.innerHTML = "Xoá phiếu thuê xe";
    } else newButton.innerHTML = "Lập phiếu thuê xe";
     newRenting.classList.toggle("hidden");
}
function showAddCustomer(){
    var addCustomer = document.getElementById('addCustomer');
    addCustomer.classList.toggle("hidden");
}

// Lấy danh sách giấy phép lái xe
async function getGplxs(){
    var gplxs = document.getElementById("selectedGplx");
    
    await fetch('http://localhost:8080/api/v1/gplxs', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }   
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(option => {
            var optionElement = document.createElement("option");
            optionElement.text = option.rank;
            optionElement.value = option.id;
            gplxs.add(optionElement);
        });
    })
    .catch(err => console.log(err));
}
getGplxs();


// Lấy danh sách khách hàng
async function getCustomers(){
    await fetch('http://localhost:8080/api/v1/customers',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        const tableBody = document.getElementById('tableCustomer');
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');
            
            const properties = ['id', 'fullname', 'birthday', 'cccd', 'phoneNumber', 'gplxes', 'note'];
            properties.forEach(prop => {
                const cell = document.createElement('td');
                cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
                if (prop === 'birthday') {
                    const formattedDate = new Date(item[prop]).toLocaleDateString('en-GB');
                    cell.textContent = formattedDate;
                } else if (prop === 'gplxes') {
                    const gplxArray = item[prop].map(gplx => gplx.rank);
                    cell.textContent = gplxArray.join(', '); 
                } else {
                    cell.textContent = item[prop];
                }
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    })
    .catch(err => console.log(err));
}
// Lấy danh sách theo điều kiện search
async function getCustomersBySearch(searchInput){
    await fetch(`http://localhost:8080/api/v1/customers/search?keyword=${searchInput}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        $("#tableCustomer").empty();
        const tableBody = document.getElementById('tableCustomer');
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('bg-bone', 'border-b');
            
            const properties = ['id', 'fullname', 'birthday', 'cccd', 'phoneNumber', 'gplxes', 'note'];
            properties.forEach(prop => {
                const cell = document.createElement('td');
                cell.classList.add('px-6', 'py-4', 'font-normal', 'whitespace-nowrap');
                if (prop === 'birthday') {
                    const formattedDate = new Date(item[prop]).toLocaleDateString('en-GB');
                    cell.textContent = formattedDate;
                } else if (prop === 'gplxes') {
                    const gplxArray = item[prop].map(gplx => gplx.rank);
                    cell.textContent = gplxArray.join(', '); 
                } else {
                    cell.textContent = item[prop];
                }
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    })
    .catch(err => console.log(err));
}
$(document).ready(function(){
    $("#searchInput").keypress(function(event) {
        if (event.which === 13) {
            $("#btnSearch").click();
        }
    });
    $("#btnSearch").on("click", function(){
        var searchInput = $("#searchInput").val();
        getCustomersBySearch(searchInput);
    });
    getCustomers();
});

// Thêm khách hàng mới
async function addCustomer(){
    var cccd = document.getElementById("cccd").value;
    var hoVaTen = document.getElementById("hoVaTen").value;
    var ngaySinh = document.getElementById("ngaySinh").value;
    var soDienThoai = document.getElementById("soDienThoai").value;
    var gplx = document.getElementById("selectedGplx").value;
    var ghiChu = document.getElementById("ghiChu").value;
    
    if (cccd === ""){
        alert("Vui lòng nhập cccd");
        return;
    }
    
    if (hoVaTen === ""){
        alert("Vui lòng nhập họ tên");
        return;
    }
    
    if (ngaySinh === ""){
        alert("Vui lòng nhập ngày sinh");
        return;
    }
    
    if (soDienThoai === ""){
        alert("Vui lòng nhập số điện thoại");
        return;
    }
    
    if (gplx === ""){
        alert("Vui lòng chọn giấy phép lái xe");
        return;
    }
    
    if (ghiChu === ""){
        alert("Vui lòng nhập ghi chú");
        return;
    }
    
    if (!soDienThoai.match(/^(0|\+84)?(\d{9,10})$/)){
        alert("Vui lòng nhập đúng định dạng số điện thoại");
        return;
    }
    
    let gplxSet = new Set(gplx);
    let gplxArr = Array.from(gplxSet);
    
    await fetch('http://localhost:8080/api/v1/customers/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cccd: cccd,
            fullname: hoVaTen,
            birthday: ngaySinh,
            phoneNumber: soDienThoai,
            gplxIds: gplxArr,
            note: ghiChu
        })
    })
        .then((res) => res.json())
        .then(data => {
            if (data.message === "CCCD must be unique"){
                alert("Căn cước công dân không được trùng");
                return;
            }
            if (data.message === "Phone number must be unique"){
                alert("Số điện thoại không được trùng");
                return;
            }
            alert("Thêm khách hàng thành công");
            showAddCustomer();
        })
        .catch(err => console.log(err))
        .finally(async () => {
            location.reload();
        });
}