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