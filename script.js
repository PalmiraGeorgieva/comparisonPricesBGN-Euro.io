const RATE = 1.95583;

const bgnInput = document.getElementById('bgnPrice');
const euroInput = document.getElementById('euroPrice');

const expectedEl = document.getElementById('expected');
const differenceEl = document.getElementById('difference');
const percentEl = document.getElementById('percent');

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
    differenceEl.classList.add('cheaper');
  } else if (diff< 0) {
    differenceEl.classList.add('more-expensive');
  }
  percentEl.textContent = `Процентна разлика: ${percentDiff.toFixed(2)}%`;

  if (percentDiff > 10) {
    percentEl.classList.add('warning');
    percentEl.textContent += ' ⚠️ над 10%';
    percentEl.style.fontWeight = 'bold';
    percentEl.style.color = '#b91c1c';
  }
  


})

