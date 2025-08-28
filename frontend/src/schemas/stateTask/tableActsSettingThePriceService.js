//Таблица: 4. Нормативные правовые акты, устанавливающие размер платы (цену, тариф) либо порядок ее установления
export const actsSettingThePrice = {
    //Шапка верхнего уровня таблицы
    headers: [
        {field:"Act",label: "Нормативный правовой акт", rowspan: 1, colspan: 5 }
    ],
    //Шапка 2-го уровня таблицы
    subheaders1: [
        {field:"typeAct", label: "вид", rowspan: 1, colspan: 1 },
        {field:"receivingBody", label: "принявший орган", rowspan: 1, colspan: 1 },
        {field:"dateAct", label: "дата", rowspan: 1, colspan: 1 },
        {field:"numberAct", label: "номер", rowspan: 1, colspan: 1 },
        {field:"nameAct", label: "наименование", rowspan: 1, colspan: 1 }
    ],
    //Ячейки таблицы
    cols: [
        {field:"typeAct"}, // вид нормативно правового акта
        {field:"receivingBody"}, // Принявший орган
        {field:"dateAct"}, // Дата
        {field:"numberAct"}, // Номер
        {field:"nameAct"} // Наименование
    ]
}