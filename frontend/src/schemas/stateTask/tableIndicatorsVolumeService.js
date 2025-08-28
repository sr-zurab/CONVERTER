//Таблица: 3.2. Показатели, характеризующие объем муниципальной услуги
export const IndicatorsVolume  = {
    //заголовки верхнего уровня
    headers  : [
        {field: "uniqueNumber", label: "Уникальный номер реестровой записи", colspan:1, rowspan:3},
        {field: "indicators-contend", label: "Показатель,характеризующий содержание муниципальной услуги", colspan:3, rowspan:1},
        {field: "Indicators-condition", label: "Показатель, характериз. условия (формы) оказания муниц. услуги", colspan:2, rowspan:1},
        {field: "Indicators-volume",label: "Показатель объема  муниципальной услуги", colspan:3, rowspan:1},
        {field: "values-volume", label: "Значение показателя объема муниципальной услуги", colspan:3, rowspan:1},
        {field:"fee-size", label: "Размер платы (цена, тариф)", colspan:3, rowspan:1},
        {field: "acceptable-values",label: "Допустимые (возможные) отклонения от установленных показателей объема муниципальной услуги", colspan:2, rowspan:1}
        ],
    //Заголовки 2-го уровня
    subHeaders1: [
        {field: "contendIndicator1", label: "наименование показателя", colspan:1, rowspan:2},
        {field: "contendIndicator2", label: "наименование показателя", colspan:1, rowspan:2},
        {field: "contendIndicator3", label: "наименование показателя", colspan:1, rowspan:2},
        {field: "conditionIndicator1", label: "наименование показателя", colspan:1, rowspan:2},
        {field: "conditionIndicator2", label: "наименование показателя", colspan:1, rowspan:2},
        {field: "volumeIndicator", label: "наименование показателя", colspan:1, rowspan:2},
        {field: "unit-of-measurement", label: "единица измерения", colspan:2, rowspan:1},
        {field: "valuesVolumeIndicatorNextYear",label: "(очередной финансовый год)", colspan:1, rowspan:2},
        {field: "valuesVolumeIndicatorFirstYear",label: "(1-й год планового периода)", colspan:1, rowspan:2},
        {field: "valuesVolumeIndicatorSecondYear",label: "(2-й год планового периода)", colspan:1, rowspan:2},
        {field: "amountFeeNextYear",label: "(очередной финансовый год)", colspan:1, rowspan:2},
        {field: "amountFeeFirstYear",label: "(1-й год планового периода)", colspan:1, rowspan:2},
        {field: "amountFeeSecondYear",label: "(2-й год планового периода)", colspan:1, rowspan:2},
        {field: "percentageDeviations",label: "в процентах", colspan:1, rowspan:2},
        {field: "absoluteValuesDeviations",label: "в абсолютных величинах", colspan:1, rowspan:2}
    ],
    //Заголовки 3-го уровня
    subHeaders2:[
        {field: "unitOfMeasurement",label: "наименование"},
        {field: "OKEI",label: "единица измерения по ОКЕИ"}
    ],
    //Ячейки таблицы
    cols:[
            {field:"uniqueNumber"},//Уникальный номер реестровой записи
            {field:"contendIndicator1"},//Показатель, характеризующий содержание муниципальной услуги: наименование показателя
            {field:"contendIndicator2"},//Показатель, характеризующий содержание муниципальной услуги: наименование показателя
            {field:"contendIndicator3"},//Показатель, характеризующий содержание муниципальной услуги: наименование показателя
            {field:"conditionIndicator1"},//Показатель, характериз. условия (формы) оказания муниц. услуги: наименование показателя
            {field:"conditionIndicator2"},//Показатель, характериз. условия (формы) оказания муниц. услуги: наименование показателя
            {field:"volumeIndicator"},//Показатель объема муниципальной услуги: наименование показателя
            {field:"unitOfMeasurement"},//Показатель объема муниципальной услуги: единица измерения : наименование
            {field:"OKEI"},//Показатель объема муниципальной услуги: единица измерения: единица измерения по ОКЕИ
            {field:"valuesVolumeIndicatorNextYear"},//Значение показателя объема государственной услуги: (очередной финансовый год)
            {field:"valuesVolumeIndicatorFirstYear"},//Значение показателя объема государственной услуги: (1-й год планового периода)
            {field:"valuesVolumeIndicatorSecondYear"},//Значение показателя объема государственной услуги: (2-й год планового периода)
            {field:"amountFeeNextYear"},//Размер платы (цена, тариф) : (очередной финансовый год)
            {field:"amountFeeFirstYear"},//Размер платы (цена, тариф) : (1-й год планового периода)
            {field:"amountFeeSecondYear"},//Размер платы (цена, тариф) : (2-й год планового периода)
            {field:"percentageDeviations"},//Допустимые (возможные) отклонения от установленных показателей объема государственной услуги : в процентах
            {field:"absoluteValuesDeviations"}//Допустимые (возможные) отклонения от установленных показателей объема государственной услуги : в абсолютных величинах
    ]
}