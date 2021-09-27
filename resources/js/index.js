/**
 * 1. 셀렉트 박스 옵션 클릭시 동적으로 인풋태그 생성
 * 2. 인풋태그에 숫자만 입력 가능하게 하고, 4자리 입력시 다음 인덱스 인풋태그로 이동
 */

const cardNumbers = document.getElementsByClassName('card-number__input');
const cardSelectSize = document.getElementById('card-select__size');
const securityCard = document.getElementById('securityCard');
const cardRow = document.getElementsByClassName('card-row');
const numberColumn = 5;
let numberRow = 5;
let cardSize = 0;


createCard(0);

// events
cardSelectSize.addEventListener('change', function() {
  createCard(cardSelectSize.value);
});


// functions
function createCard(index) {
  securityCard.innerHTML = '';
  index = Number(index);
  cardSize = (numberRow + index) * numberColumn;
  let indexNumber = 0;  // i % 5 == 0일때 1씩 증가 
  const rowTemplate = `
    <div class="row gx-1 card-row">
  `; 
  for (let i = 1; i <= cardSize; i++) {
    if (i % 5 === 1) {
      securityCard.innerHTML += rowTemplate;
      cardRow[indexNumber].innerHTML += `
        <div class="col-auto index-color">${i}</div>
        <div class="col-1 card-number"><input class="card-number__input" type="text"></div>
      `
    } else {
      cardRow[indexNumber].innerHTML += `
        <div class="col-auto index-color">${i}</div>
        <div class="col-1 card-number"><input class="card-number__input" type="text"></div>
      `
      if (i % 5 == 0 ) {
        indexNumber++;
      } 
    }
    let cardNumber = cardNumbers[i-1];
    cardNumber.dataset.indexNumber = i-1;
    console.log(cardNumbers[cardNumber.dataset.indexNumber]);
    cardNumber.addEventListener('input', setFocus);
  }
}

function setFocus(event) {
  let index = Number(this.dataset.indexNumber);
  console.log(index);
  if (event.target.value.length === 4) {
    if (cardNumbers[index + 1] != undefined) {
      cardNumbers[index + 1].focus();
    }
  }
}