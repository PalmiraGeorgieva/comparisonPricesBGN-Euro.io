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
let currentLang = 'bg'
function changeLanguage(lang){
  currentLang = lang
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const key = el.getAttribute('data-key-placeholder');
    el.placeholder = translations[lang][key];
  })
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    changeLanguage(lang);
  });
});

let soundEnabled = true;

const soundBtn = document.getElementById('soundToggle');

soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
});


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

  expectedEl.textContent = `${translations[currentLang].expected} ${expectedPrice.toFixed(2)} €`;
  differenceEl.className = '';
  percentEl.className = '';

  differenceEl.textContent = `${translations[currentLang].difference} ${diff > 0 ? '+' : ''}${diff.toFixed(2)} €`;

  if (diff > 0) {
    differenceEl.classList.add('more-expensive');
  } else if (diff< 0) {
    differenceEl.classList.add('cheaper');
  }
  percentEl.textContent = `${translations[currentLang].percent} ${percentDiff.toFixed(2)}%`;
  if (soundEnabled) {
   coinSound.play();
  }


  if(percentDiff > 0) {
    percentEl.classList.add('more-expensive');
  } else if(percentDiff < 0) {
    percentEl.classList.add('cheaper');
  } 
  
  if (percentDiff > 10) {
    percentEl.classList.add('warning');
    percentEl.textContent += ' ⚠️';
    percentEl.style.fontWeight = 'bold';
    if (soundEnabled) {
       alertSound.play();
     }
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


















