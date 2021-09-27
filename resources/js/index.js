const securityKey = 'security-card'
const directions = [
  '가로',
  '세로'
]
const digits = [
  3,
  4
]
const numberCounts = [
  25,
  30,
  35,
  40
]

let selectedDirection = 0
let selectedDigit = 1
let selectedCount = 2
let serityCardNumbers = []

const securityCardElement = document.getElementById('securityCard')
for (let i = 0; i < numberCounts[selectedCount]; i++) {
  serityCardNumbers.push('')
}

var directionElement = document.getElementById('directionElement');
var digitElement = document.getElementById('digitElement');
var countElement = document.getElementById('countElement');

localStorageFetch()
fetch()

function localStorageFetch() {
  let data = getLocalStorage(securityKey)
  selectedDirection = data.direction
  selectedDigit = data.digit
  selectedCount = data.count
  serityCardNumbers = data.numbers

  directionElement.value = selectedDirection
  digitElement.value = selectedDigit
  countElement.value = selectedCount
}

function fetch() {
  let html = ''
  let index = -1
  let count = 1
  for (let i = 1; i <= numberCounts[selectedCount]; i++) {
    if (i % 5 == 1) {
      html += `<div class="row">`
      index = count
    }
    if (directions[selectedDirection] == '가로') {
      html += `
        <div class="col text-center">
          <div class="row">
            <div class="col text-white bg-success">
              ${i}
            </div>      
            <input id='input${i}' type="text" class="col card-number" maxlength="${digits[selectedDigit]}" data-index="${i}" value="${serityCardNumbers[i] == undefined ? '' : serityCardNumbers[i]}"/>
          </div>
        </div>
      `
    } else {
      html += `
        <div class="col text-center">
          <div class="row">
            <div class="col text-white bg-primary">
              ${index}
            </div>
            <input id='input${index}' type="text" class="col card-number" maxlength="${digits[selectedDigit]}" data-index="${Number(index)}"  value="${serityCardNumbers[index] == undefined ? '' : serityCardNumbers[index]}"/>
          </div>
        </div>
      `
      index += numberCounts[selectedCount]/5
    }
    
    if (i % 5 == 0) {
      html += `</div>`
      count += 1
    }
  }
  securityCardElement.innerHTML = html

  const inputElements = document.getElementsByClassName('card-number')  
  let inputElementList = [...inputElements]
  inputElementList.map((inputElement) => {
    inputElement.addEventListener('input', checkNumber)
  })
}

function checkNumber(event) {
  let currentIndex = Number(this.dataset.index)
  serityCardNumbers[currentIndex] = event.target.value
  if (event.target.value.length == digits[selectedDigit]) {
    if (document.getElementById(`input${currentIndex + 1}`) != null) {
      document.getElementById(`input${currentIndex + 1}`).focus()
    }
  } else if (event.target.value.length == 0) {
    if (document.getElementById(`input${currentIndex - 1}`) != null) {
      document.getElementById(`input${currentIndex - 1}`).focus()
    }
  }

  setLocalStorage(securityKey, {
    direction: selectedDirection,
    digit: selectedDigit,
    count: selectedCount,
    numbers: serityCardNumbers
  })
}

function changeDirection() {  
  var value = directionElement.options[directionElement.selectedIndex].value;  
  selectedDirection = Number(value)
  fetch()

  setLocalStorage(securityKey, {
    direction: selectedDirection,
    digit: selectedDigit,
    count: selectedCount,
    numbers: serityCardNumbers
  })
}

function changeDigit() {
  var value = digitElement.options[digitElement.selectedIndex].value;  
  selectedDigit = Number(value)
  fetch()

  setLocalStorage(securityKey, {
    direction: selectedDirection,
    digit: selectedDigit,
    count: selectedCount,
    numbers: serityCardNumbers
  })
}

function changeCount() {
  var value = countElement.options[countElement.selectedIndex].value;  
  selectedCount = Number(value)
  fetch()

  setLocalStorage(securityKey, {
    direction: selectedDirection,
    digit: selectedDigit,
    count: selectedCount,
    numbers: serityCardNumbers
  })
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}