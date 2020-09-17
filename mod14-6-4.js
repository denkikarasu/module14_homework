  // переменные для нод
  let resultNode;
  let btnNode;

  window.onload = function() {
    resultNode = document.querySelector('.j-result');
    // кнопка для отправки запроса
    btnNode = document.querySelector('.j-btn-request');
    // обработчик на кнопку для запроса
    btnNode.addEventListener('click', () => {
      const inputWidth = Number(document.querySelector('.j-input-width').value);
      const inputHeight = Number(document.querySelector('.j-input-height').value);
      //console.log(inputWidth, inputHeight);
      if (!Number.isInteger(inputWidth) || !Number.isInteger(inputHeight)) {
        displayErrorMsg("Возможно, вы ввели не целое число");
      } else if ((inputWidth<100 || inputWidth>300) || (inputHeight<100 || inputHeight>300)) {
        displayErrorMsg("Одно из чисел вне диапазона от 100 до 300");
      } else {
        // запрос изображения с нужными размерами
        fetch(`https://picsum.photos/${inputWidth}/${inputHeight}`)
      .then((response) => {
        //console.log(response.url);
        displayResult(response.url);
      })
      .catch(() => { console.log('error'); });
      }
    
    });
  };
  
  
  // Функция вывода изображения
    function displayResult(url) {
      const cardBlock = `
        <div class="card">
          <img src="${url}" />
        </div>
      `;
    resultNode.innerHTML = cardBlock;
  }
  
  // функция для вывода ошибки
  function displayErrorMsg(message) {
    const display = `<p>${message}</p>`;
    resultNode.innerHTML = display;
  }
  
  

  // В codepen:
  // https://codepen.io/denkikarasu/pen/OJNEwab

  // Доработано аналогично mod14-3-3.js. 
  // При перезагрузке страницы дебаггер отлавливает ту же ошибку, при закрытых devtools сбоев нет.