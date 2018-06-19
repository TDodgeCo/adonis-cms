var saveButton = document.getElementById('saveButton')
var content = document.getElementById('content')

saveButton.addEventListener('click', function () {
  var body = quill.root.innerHTML

  var bodyInput = document.getElementById('body').value = body
  if (bodyInput === body) {
    document.getElementById('postForm').submit()
  } else alert('not submitted')

})
