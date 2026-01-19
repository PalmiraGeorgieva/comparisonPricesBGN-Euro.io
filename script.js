const translations = {
  bg: {
    title: 'Сравнение на цени Евро/Лева',
    rate: '1 Евро = 1.95583 Лева' ,
    bgnLabel: 'Цена в лева',
    euroLabel: 'Обявена цена в Евро',
    compare: 'Сравни',
    clear: 'Изчисти',
    bgnPlaceholder: 'Моля въведете цената в лева!',
    euroPlaceholder: 'Моля въведете цената в евро!',
    expected: 'Очаквана цена в Евро:',
    difference: 'Разлика:',
    percent: 'Процентна разлика:'
  },

  en: {
    title: 'Price Comparison Euro/BGN',
    rate: '1 Euro = 1.95583 BGN' ,
    bgnLabel: 'Price in BGN',
    euroLabel: 'Listed price in Euro',
    compare: 'Compare',
    clear: 'Clear',
    bgnPlaceholder: 'Enter price in BGN!',
    euroPlaceholder: 'Enter price in Euro!',
    expected: 'Expected price in Euro:',
    difference: 'Difference:',
    percent: 'Percentage difference:'
  }
}

function changeLanguage(lang){
  document.querySelectorAll('[data-key').forEach(el => {
    const key = el.getAttribute('data-key');
    el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const key = el.getAttribute('data-key-placeholder');
    el.textContent = translations[lang][key];
  })
}

const languageSelect = document.getElementById('languageSelect')
let currentLang = 'bg'
languageSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  changeLanguage(currentLang)
})

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













