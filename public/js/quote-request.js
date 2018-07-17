var quoteTab = document.getElementById('quoteTab')
var addonsTab = document.getElementById('addonsTab')
var optionsTab = document.getElementById('optionsTab')
var personalTab = document.getElementById('personalTab')
var completeTab = document.getElementById('completeTab')

var quoteButton = document.getElementById('quoteButton')
var addonsButton = document.getElementById('addonsButton')
var optionsButton = document.getElementById('optionsButton')
var submitButton = document.getElementById('submitButton')



quoteButton.addEventListener('click', function() {
  quoteTab.classList.remove('active')
  addonsTab.classList.add('active')
})

addonsButton.addEventListener('click', function() {
  addonsTab.classList.remove('active')
  optionsTab.classList.add('active')
})

optionsButton.addEventListener('click', function() {
  addonsTab.classList.remove('active')
  optionsTab.classList.add('active')
})

optionsButton.addEventListener('click', function() {
  optionsTab.classList.remove('active')
  personalTab.classList.add('active')
})

submitButton.addEventListener('click', function() {
  personalTab.classList.remove('active')
  completeTab.classList.add('active')
})
