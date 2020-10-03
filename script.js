const search = document.getElementById('search'),
  check = document.getElementById('check'),
  btnOnLength = document.querySelector('.btn-length'),
  resultField = document.getElementById('result-field'),
  btnOnSubString = document.querySelector('.btn-subString');

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
  resultData.filter(item => {
    if (isNumber(searchValue) && searchValue && item.length > searchValue) {
      resultField.textContent = '';
      searchData.push(item);
      resultField.classList.remove('warning');
    } else if (!searchValue || !isNumber(searchValue)) {
      resultField.textContent = 'enter the number';
      resultField.classList.add('warning');
    }
  });
  searchData.forEach((item) => {
    resultField.insertAdjacentHTML('beforeend',
      `<div>${item}</div>`)
  })
};

const renderSubString = () => {
  let searchValue = search.value;
  resultField.classList.remove('warning');
  resultData.filter(item => {
    searchData.length = 0;
    if (searchValue && checked && item.includes(searchValue)) {
      searchData.push(item);
    } else if (searchValue && !checked && item.toLowerCase().includes(searchValue.toLowerCase())) {
      searchData.push(item);
    } else if(!searchValue || isNumber(searchValue)) {
      resultField.textContent = 'enter the substring or string';
      resultField.classList.add('warning');
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

btnOnSubString.addEventListener('click', (event) => {
  event.preventDefault();
  searchData.length = 0;
  resultField.textContent = "";
  renderSubString();
});

btnOnLength.addEventListener('click', (event) => {
  event.preventDefault();
  searchData.length = 0;
  resultField.textContent = "";
  render()
});


