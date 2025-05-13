const arr = [1100, 1220, 1300, 1420, 1500];

function test(a) {
    if (arr.includes(a)) { // Проверяем, содержится ли 'a' в массиве
        console.log('!!!')}
    else {
        return console.log("no")
        }
}

test(50); // Выведет '!!!'
