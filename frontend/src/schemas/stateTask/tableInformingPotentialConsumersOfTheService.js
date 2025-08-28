//Таблица: 5.2. Порядок информирования потенциальных потребителей государственной услуги
export const InformingPotentialConsumersOfTheService = {
    //Шапка верхнего уровня таблицы
    headers: [
        {field: "informationMethod",label: "Способ информирования", colspan:1, rowspan:1},
        {field: "compositionInformation",label: "Состав размещаемой информации", colspan:1, rowspan:1},
        {field: "refreshRate",label: "Частота обновления информации", colspan:1, rowspan:1}
    ],
    //Ячейки таблицы
    cols: [
        {field: "informationMethod"}, //Способ информирования
        {field: "compositionInformation"}, //Состав размещаемой информации
        {field: "refreshRate"} //Частота обновления информации
    ]
}