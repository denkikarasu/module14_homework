  // переменные для нужных нод
  let resultNode;
  let btnNode;

  // Функция для вывода изображений
function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
   
  resultNode.innerHTML = cards;
}

  // функция для вывода ошибки
  function displayErrorMsg(message) {
    const display = `<p>${message}</p>`;
    resultNode.innerHTML = display;
  }

window.onload = function () {
  resultNode = document.querySelector('.j-result');
  // кнопка для отправки запроса
  btnNode = document.querySelector('.j-btn-request');
 
  
  // обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {
    // переменные
    const inputPage = Number(document.querySelector('.input-page').value);
    const inputLimit = Number(document.querySelector('.input-limit').value);
    
    // проверка соответствия ввода заданным условиям
    if ((!Number.isInteger(inputPage) || inputPage<1 || inputPage>10) && (!Number.isInteger(inputLimit) || inputLimit<1 || inputLimit>10)) {
      displayErrorMsg("Номер страницы и лимит вне диапазона от 1 до 10");
    } else if (!Number.isInteger(inputPage) || inputPage<1 || inputPage>10) {
      displayErrorMsg("Номер страницы вне диапазона от 1 до 10");
    } else if (!Number.isInteger(inputLimit) || inputLimit<1 || inputLimit>10) {
      displayErrorMsg("Лимит вне диапазона от 1 до 10");
    } else {
      
      // запрос 
      fetch(`https://picsum.photos/v2/list?page=${inputPage}&limit=${inputLimit}`)
    .then((response) => {
      // Объект ответа на запрос
      const result = response.json();
      return result;
    })
    .then((data) => {
      // отображение результата
      displayResult(data);
      // запись в localStorage
      const dataString = JSON.stringify(data);
      localStorage.setItem('myImages', dataString);
    })
    .catch(() => { console.log('error'); });
    }
  
  });

  // вывод изображений из localStorage
  const dataJSON = JSON.parse(localStorage.getItem('myImages'));
  // console.log('dataJSON', dataJSON);
  displayResult(dataJSON);
};

  // В codepen:
  // https://codepen.io/denkikarasu/pen/VwaBwJY

  // Доработано аналогично mod14-3-3.js. 
  // При перезагрузке страницы дебаггер отлавливает ту же ошибку, при закрытых devtools сбоев нет.