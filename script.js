const RATE = 1.95583;

const bgnInput = document.getElementById('bgnPrice');
const euroInput = document.getElementById('euroPrice');

const expectedEl = document.getElementById('expected');
const differenceEl = document.getElementById('difference');
const percentEl = document.getElementById('percent');
const resultDiv = document.getElementById('result')
const coinSound = document.getElementById('coinSound');
const alertSound = document.getElementById('alertSound');
const clearBtn = document.getElementById('clearBtn');

document.getElementById('compareBtn').addEventListener('click', () =>{
  const bgn = Number(bgnInput.value);
  const euro = Number(euroInput.value);

  if( bgn <= 0 || euro <= 0) {
    alert('Моля, въведете валидна стойност!');
    return;
  }

  const expectedPrice = bgn / RATE;
  const diff = euro - expectedPrice;
  const percentDiff = (diff / expectedPrice) * 100;

  expectedEl.textContent = `Очаквана цена в Евро: ${expectedPrice.toFixed(2)} €`;
  differenceEl.className = '';
  percentEl.className = '';

  differenceEl.textContent = `Разликата: ${diff > 0 ? '+' : ''}${diff.toFixed(2)} €`;

  if (diff > 0) {
    differenceEl.classList.add('more-expensive');
  } else if (diff< 0) {
    differenceEl.classList.add('cheaper');
  }
  percentEl.textContent = `Процентна разлика: ${percentDiff.toFixed(2)}%`;
  coinSound.play()

  if(percentDiff > 0) {
    percentEl.classList.add('more-expensive');
  } else if(percentDiff < 0) {
    percentEl.classList.add('cheaper');
  } 
  
  if (percentDiff > 10) {
    percentEl.classList.add('warning');
    percentEl.textContent += ' ⚠️ над 10%';
    percentEl.style.fontWeight = 'bold';
    alertSound.play()
  }
  
  resultDiv.classList.add('show')

})

clearBtn.addEventListener('click', () => {
   bgnInput.value = '';
   euroInput.value = '';

   expectedEl.textContent = '-';
   differenceEl.textContent = '-';
   percentEl.textContent = '-';

  
   differenceEl.className = '';
   percentEl.className = '';
   resultDiv.classList.remove('show');
})










