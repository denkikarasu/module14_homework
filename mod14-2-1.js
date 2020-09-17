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

for (i = 0; i < 2; i++) {
  let studentNode = listNode.getElementsByTagName("student")[i];

  list.push({
    name: `${studentNode.querySelector("name").querySelector("first").textContent} ${studentNode.querySelector("name").querySelector("second").textContent}`,
    age: Number(studentNode.querySelector("age").textContent),
    prof: studentNode.querySelector("prof").textContent,
    lang: studentNode.querySelector("name").getAttribute('lang')
  });
}

/* 3. Запись данных в объект */

const result = {
  list: list
};
console.log('result', result);

// Пока не разобралась, как определить число узлов с заданным именем для использования в цикле.
