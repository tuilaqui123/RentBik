$(document).ready(function(){
    $(this).keypress(function(event) {
        if (event.which === 13) {
            changePassword();
        }
    });
});

function changePassword(){
    var pincode = $("#pincode").val();
    if (pincode === ""){
        alert("Vui lòng nhập mã PIN");
        return;
    }
    
    var newpassword = $("#newpassword").val();
    if (newpassword === ""){
        alert("Vui lòng nhập mật khẩu");
        return;
    }
    
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
        window.location.href = '../Login.jsp';
    })
    .catch(err => console.log(err));
}