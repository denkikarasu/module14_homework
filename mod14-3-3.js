/**
  * Функция-обертка над XMLHttpRequest
  */
 function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  }
  
  // нода для вставки результата запроса
  const resultNode = document.querySelector('.j-result');
  // кнопка для отправки запроса
  const btnNode = document.querySelector('.j-btn-request');
  
  /**
    * Функция обработки полученного результата
    */
  function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);
    
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
  
  function displayErrorMsg(message) {
    const display = `<p>${message}</p>`;
    resultNode.innerHTML = display;
  }
  
  // обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {
    const inputNumber = Number(document.querySelector('.j-input-number').value);
    // проверка на нецелое число добавлена из общих соображений
    // допустимо также использовать input type="text", проверка с помощью isInteger отфильтрует и введенные нечисловые значения
    //console.log(inputNumber);
    if(!Number.isInteger(inputNumber)) {
      displayErrorMsg("Это не целое число!");
    } else if (inputNumber<1 || inputNumber>10) {
      displayErrorMsg("Число вне диапазона от 1 до 10");
    } else {
      useRequest(`https://picsum.photos/v2/list/?limit=${inputNumber}`, displayResult);
    }
  
  });

  // При попытке запуска в текущем виде через браузер получаю ошибку: 
  // TypeError: Cannot read property 'addEventListener' of null
  // В codepen тот же код (без <head> в html) работает без проблем:
  // https://codepen.io/denkikarasu/pen/qBZKOMe