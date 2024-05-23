$(document).ready(function(){
    $(this).keypress(function(event) {
        if (event.which === 13) {
            login();
        }
    });
});
function login(){
    var email = $("#email").val();
    if (email === ""){
        alert("Vui lòng nhập email");
        return;
    }
    
    var password = $("#password").val();
    if (password === ""){
        alert("Vui lòng nhập mật khẩu");
        return;
    }
    
    fetch('http://localhost:8080/api/v1/account',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.email !== email){
            alert("Sai email");
            return;
        }
        if (data.password !== password){
            alert("Sai password");
            return;
        }
        alert("Đăng nhập thành công");
        window.location.href = './customer/customer.jsp';
    })
    .catch(err => console.log(err));
}

function changePassword(){
    var pincode = $("#pincode").val();
    var newpassword = $("#newpassword").val();
    
    fetch(`http://localhost:8080/api/v1/account/change_password?pin_code=${pincode}&new_password=${newpassword}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "Pin code doesn't match"){
            alert("Mã PIN khồng đúng");
            return;
        }
        alert("Đổi mật khẩu thành công");
        window.location.href = '.,/Login.jsp';
    })
    .catch(err => console.log(err));
}