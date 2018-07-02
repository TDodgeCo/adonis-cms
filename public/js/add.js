var saveButton = document.getElementById('saveButton')
var content = document.getElementById('content')

saveButton.addEventListener('click', function () {
  var body = quill.root.innerHTML

  var bodyInput = document.getElementById('body').value = body
  if (bodyInput === body) {
    document.getElementById('postForm').submit()
  } else alert('not submitted')

})

function checkPass () {
    var pass1 = document.getElementById('password');
    var pass2 = document.getElementById('confirmPassword');
    var message = document.getElementById('confirmMessage');
    if (pass1.value == pass2.value) {
        message.innerHTML = ""
    } else {
        message.innerHTML = "Passwords Do Not Match!"
    }
}

function createNewFaqInput () {
  var number = 0
  var faqCount = document.getElementById('addFaq')
  var faqDestroyOne = document.getElementById('faqDestroyOne')
  var container = document.getElementById('faqInputDiv')
  var br = document.createElement('br')

  function appendFaq () {
    if (!container) {console.log(container)}
    var div = document.createElement('div')
    var inputTitleLabel = document.createElement('label')
    var titleLabel = document.createTextNode('Title')
    var inputTitle = document.createElement('input')
    var inputBodyLabel = document.createElement('label')
    var bodyLabel = document.createTextNode('Body')
    var inputBody = document.createElement('input')
    var h5 = document.createElement('h5')
    h5.innerHTML = 'FAQ ' + number
    h5.classList.add('mt-2')
    inputTitle.type = 'text'
    inputTitle.name = 'faq_title[' + (number - 1) + ']'
    inputTitle.classList.add('form-control')
    inputBody.type = 'text'
    inputBody.name = 'faq_body[' + (number - 1) + ']'
    inputBody.classList.add('form-control')
    inputTitleLabel.appendChild(titleLabel)
    inputBodyLabel.appendChild(bodyLabel)
    div.classList.add('form-group')
    div.appendChild(h5)
    div.appendChild(br)
    div.appendChild(inputTitleLabel)
    div.appendChild(inputTitle)
    div.appendChild(inputBodyLabel)
    div.appendChild(inputBody)
    container.appendChild(div)
  }
  faqCount.addEventListener('click', function () {
    number = number + 1
    appendFaq()
  })

  faqDestroyOne.addEventListener('click', function () {
    number = number - 1
    var faqContainer = document.getElementById('faqInputDiv')
    var killDiv = faqContainer.getElementsByTagName('div')
    faqContainer.removeChild(faqContainer.lastChild)
  })
}
window.onload = createNewFaqInput()
