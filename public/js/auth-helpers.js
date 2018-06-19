function checkPass() {
    var pass1 = document.getElementById('password');
    var pass2 = document.getElementById('confirmPassword');
    var message = document.getElementById('confirmMessage');
    if (pass1.value == pass2.value) {
        message.innerHTML = ""
    } else {
        message.innerHTML = "Passwords Do Not Match!"
    }
}
