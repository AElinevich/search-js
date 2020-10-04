const search = document.getElementById('search'),
  check = document.getElementById('check'),
  btnOnNumber = document.querySelector('.btn-number'),
  resultField = document.getElementById('result-field'),
  btnOnString = document.querySelector('.btn-string'),
  warningField = document.getElementById('warning-field');
  

let resultData = [];
let searchData = [];
let checked;

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const getData = {
  url: 'https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json',
  get(process) {
    fetch(this.url)
      .then(response => response.json())
      .then(process)
  },
  getBase() {
    this.get((data) => {
      data.data.forEach((item) => resultData.push(item));
    })
  },
};

getData.getBase();

const render = () => {
  let searchValue = +search.value;
  warningField.classList.remove('warning');
  resultData.filter(item => {
    if (isNumber(searchValue) && searchValue && item.length > searchValue) {
      warningField.textContent = '';
      searchData.push(item);
      warningField.classList.remove('warning');
    } else if (!searchValue || !isNumber(searchValue)) {
      warningField.classList.add('warning');
      warningField.textContent = 'enter the number';
    
    }
  });
  searchData.forEach((item) => {
    resultField.insertAdjacentHTML('beforeend',
      `<div>${item}</div>`)
  })
};

const renderSubString = () => {
  let searchValue = search.value;
  warningField.classList.remove('warning');
  warningField.textContent = '';
  resultData.filter(item => {
    searchData.length = 0;
    if (searchValue && checked && item.includes(searchValue)) {
      searchData.push(item);
    } else if (searchValue && !checked && item.toLowerCase().includes(searchValue.toLowerCase())) {
      searchData.push(item);
    } else if(!searchValue || isNumber(searchValue)) {
      warningField.textContent = 'enter the substring or string';
      warningField.classList.add('warning');
    }
    searchData.forEach((item) => {
      resultField.insertAdjacentHTML('beforeend',
        `<div>${item}</div>`)
    })
  })
};

check.addEventListener('click', () => {
  check.checked ? checked = true : checked = false;
});

btnOnString.addEventListener('click', (event) => {
  event.preventDefault();
  searchData.length = 0;
  resultField.textContent = "";
  renderSubString();
});

btnOnNumber.addEventListener('click', (event) => {
  event.preventDefault();
  searchData.length = 0;
  resultField.textContent = "";
  render()
});


