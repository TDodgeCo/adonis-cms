var saveButton = document.getElementById('saveButton')
var content = document.getElementById('content')

saveButton.addEventListener('click', function () {
  var body = quill.root.innerHTML

  var bodyInput = document.getElementById('body').value = body
  if (bodyInput === body) {
    document.getElementById('postForm').submit()
  } else alert('not submitted')

})

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
