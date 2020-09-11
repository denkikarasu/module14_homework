/* 1. Подготовка данных */

// JSON
const jsonString = `
{
  "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

/* 2. Получение данных */
const data = JSON.parse(jsonString);
const list = data.list;
const students = [];

list.forEach(function(student) {
  students.push({
    name: student.name,
    age: Number(student.age),
    prof: student.prof
  });
});

/* 3. Запись данных в объект */
const result = {
  list: students
};
console.log('result', result);
