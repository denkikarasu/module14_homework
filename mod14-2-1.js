/* 1. Подготовка данных */

const parser = new DOMParser();

// XML
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

/* 2. Получение данных */

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const list = [];

const listNode = xmlDOM.querySelector("list");

const studentNodes = listNode.querySelectorAll("student");

studentNodes.forEach(studentNode => {
  list.push({
    name: `${studentNode.querySelector("name").querySelector("first").textContent} ${studentNode.querySelector("name").querySelector("second").textContent}`,
    age: Number(studentNode.querySelector("age").textContent),
    prof: studentNode.querySelector("prof").textContent,
    lang: studentNode.querySelector("name").getAttribute('lang')
  });
})

/* 3. Запись данных в объект */

const result = {
  list: list
};
console.log('result', result);

// Пока не разобралась, как определить число узлов с заданным именем для использования в цикле.

/* ---- */

// Если вы не знаете точное количество узлов, можно и нужно использовать querySelectorAll - этот метод найдет все узлы по селектору, а не только первое совпадение, как у querySelector. querySelectorAll возвращает коллекцию найденных элементов, которую можно перебрать циклом, как обычный массив.
// Выше в коде показала, как правильно это сделать