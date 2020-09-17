// Функция-обертка над XMLHttpRequest
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
  
  // Переменные для нужных нод
  let resultNode;
  let btnNode;

    // Функция для получения нужных узлов
    window.onload = function() {
      resultNode = document.querySelector('.j-result');
      btnNode = document.querySelector('.j-btn-request');
      
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
    };
  

  
  // aункция обработки полученного результата    
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
  
  function displayErrorMsg(message) {
    const display = `<p>${message}</p>`;
    resultNode.innerHTML = display;
  }
  
  // (РЕШЕНО) При попытке запуска в текущем виде через браузер получаю ошибку: 
  // TypeError: Cannot read property 'addEventListener' of null
  // В codepen тот же код (без <head> в html) работает без проблем:
  // https://codepen.io/denkikarasu/pen/qBZKOMe

  // (ПРОМЕЖУТОЧНЫЙ ВАРИАНТ) вариант решения путем переноса скрипта в конец тега <body> (где он запускается в codepen согласно https://blog.codepen.io/documentation/preview-template/).

  //  Проблема объясняется тем, что скрипт загружается раньше, чем html, поэтому решена оборачиванием кода в функцию window.onload.

  // Правда, при включенном дебаггере при перезагрузке страницы получаю ошибку: https://prnt.sc/uinz28. В этом разобраться уже не могу. При отключении дебаггера или закрытых инструментах разработчика работает.