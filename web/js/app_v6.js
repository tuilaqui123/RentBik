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
    
    getCccd('update');
    getCccd('delete');
    
    getGplxsForUpdate();

    $("#updateSelectedCcccd").change(function(){
        var cccd = $(this).val();
        getCustomerByCccd(cccd, 'update');
        
        $("#updateSelectedGplx").change(function(){
           var gplx = $(this).val();
           $("#updateGplx").val(gplx);
        });
    });
    
    $("#deleteSelectedCcccd").change(function(){
        var cccd = $(this).find("option:selected").text();
        getCustomerByCccd(cccd, 'delete');
    });
});

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

function showUpdateCustomer(){
    var updateCustomer = document.getElementById('updateCustomer');
    updateCustomer.classList.toggle("hidden");
}

function showDeleteCustomer(){
    var deleteCustomer = document.getElementById('deleteCustomer');
    deleteCustomer.classList.toggle("hidden");
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

async function getGplxsForUpdate(){
    var gplxs = document.getElementById("updateSelectedGplx");
    
    var defaultOption = document.createElement("option");
    defaultOption.text = "Giấy phép lái xe";
    defaultOption.value = "";
    defaultOption.selected = true; 
    defaultOption.disabled = true;
    gplxs.appendChild(defaultOption);
    
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
            optionElement.value = option.rank;
            gplxs.add(optionElement);
        });
    })
    .catch(err => console.log(err));
}

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
        }
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
        }
    })
    .catch(err => console.log(err));
}

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
    
    var ngaySinhDate = new Date(ngaySinh);
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (ngaySinhDate > currentDate){
        alert("Ngày sinh không được sau ngày hiện tại");
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

// Lấy danh sách căn cước công dân
async function getCccd(method){
    var cccds = (method === 'update' ? document.getElementById("updateSelectedCcccd") : document.getElementById("deleteSelectedCcccd"));
    
    var defaultOption = document.createElement("option");
    defaultOption.text = "Căn cước công dân";
    defaultOption.value = "";
    defaultOption.selected = true; 
    defaultOption.disabled = true;
    cccds.appendChild(defaultOption);
    
    await fetch('http://localhost:8080/api/v1/customers/cccds', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }   
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(option => {
            var optionElement = document.createElement("option");
            optionElement.text = option.cccd;
            optionElement.value = (method === 'update' ? option.cccd : option.id);
            cccds.add(optionElement);
        });
    })
    .catch(err => console.log(err));
}

// Lấy thông tin khách hàng theo cccd
async function getCustomerByCccd(cccd, method){
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
        
        if (method === 'update'){
            $("#updateHoVaTen").val(data.fullname);
            $('#updateHoVaTen').removeAttr('disabled');

            $("#updateNgaySinh").val(data.birthday);
            $('#updateNgaySinh').removeAttr('disabled');

            $("#updateSoDienThoai").val(data.phoneNumber);
            $('#updateSoDienThoai').removeAttr('disabled');

            $("#updateGplx").val(data.gplxes[0].rank);
            $('#updateGplx').removeAttr('disabled');

            $("#updateGhiChu").val(data.note);
            $('#updateGhiChu').removeAttr('disabled');
        }else{
            $("#deleteHoVaTen").val(data.fullname);
            $("#deleteNgaySinh").val(data.birthday);
            $("#deleteSoDienThoai").val(data.phoneNumber);
            $("#deleteGplx").val(data.gplxes[0].rank);
            $("#deleteGhiChu").val(data.note);
        }
    })
    .catch(err => console.log(err));
}

// Lấy thông tin giấy phép lái xe theo tên
const getInfoGplxByName = async (name) => {
    let gplxIds = [];
    
    await fetch(`http://localhost:8080/api/v1/gplx/search/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            gplxIds.push(item.id);
        });
        
    })
    .catch(err => console.log(err));
    
    return gplxIds;
};

// Cập nhật khách hàng
async function updateCustomer(){
    var cccd = document.getElementById("updateSelectedCcccd").value;
    var hoVaTen = document.getElementById("updateHoVaTen").value;
    var ngaySinh = document.getElementById("updateNgaySinh").value;
    var soDienThoai = document.getElementById("updateSoDienThoai").value;
    var gplx = document.getElementById("updateGplx").value;
    var ghiChu = document.getElementById("updateGhiChu").value;
    var gplxIds = await getInfoGplxByName(gplx);
    
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
    
    if (!soDienThoai.match(/^(0|\+84)?(\d{9,10})$/)){
        alert("Vui lòng nhập đúng định dạng số điện thoại");
        return;
    }
    
    if (gplxIds.length === 0){
        alert("Giấy phép lái xe không tồn tại");
        return;
    }
    
    let gplxSet = new Set(gplxIds);
    let gplxArr = Array.from(gplxSet);
    
    await fetch('http://localhost:8080/api/v1/customers/update', {
        method: "PUT",
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
        if (data.message === "Phone number must be unique"){
            alert("Số điện thoại không được trùng");
            return;
        }
        alert("Cập nhật khách hàng thành công");
    })
    .catch(err => console.log(err))
    .finally(async () => {
        location.reload();
    });
}

// Xóa khách hàng
async function deleteCustomer(){
    var customer_id = document.getElementById("deleteSelectedCcccd").value;
    
    fetch(`http://localhost:8080/api/v1/customers/${customer_id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then(data => {
        if (data.message === "CCCD doesn't exist"){
            alert("Căn cước công dân không tồn tại");
            return;
        }
        
        if (data.message === "This customer is still renting car"){
            alert("Khách hàng này vẫn còn đang thuê xe");
            return;
        }
        
        alert("Xóa khách hàng thành công");
    })
    .catch(err => console.log(err))
    .finally(async () => {
        location.reload();
    });
}