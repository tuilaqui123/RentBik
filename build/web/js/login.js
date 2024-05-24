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