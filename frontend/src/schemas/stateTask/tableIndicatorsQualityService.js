//Таблица: 3.1. Показатели, характеризующие качество муниципальной услуги
export const IndicatorsQuality  = {
    //Шапка верхнего уровня таблицы
    headers  : [
        {field: "uniqueNumber", label: "Уникальный номер реестровой записи", colspan:1, rowspan:3},
        {field: "indicators-contend", label: "Показатель,характеризующий содержание муниципальной услуги", colspan:3, rowspan:1},
        {field: "Indicators-condition", label: "Показатель, характериз. условия (формы) оказания муниц. услуги", colspan:2, rowspan:1},
        {field: "Indicators-quality",label: "Показатель качества муниципальной услуги", colspan:3, rowspan:1},
        {field: "values-quality",label: "Значение показателя качества муниципальной услуги", colspan:3, rowspan:1},
        {field: "acceptable-values",label: "Допустимые (возможные) отклонения от установленных показателей объема муниципальной услуги", colspan:2, rowspan:1}
        ],
    //Шапка 2-го уровня таблицы
    subHeaders1: [
        {field: "contendIndicator1",label: "наименование показателя", colspan:1, rowspan:2},
        {field: "contendIndicator2",label: "наименование показателя", colspan:1, rowspan:2},
        {field: "contendIndicator3",label: "наименование показателя", colspan:1, rowspan:2},
        {field: "conditionIndicator1",label: "наименование показателя", colspan:1, rowspan:2},
        {field: "conditionIndicator2",label: "наименование показателя", colspan:1, rowspan:2},
        {field: "qualityIndicator",label: "наименование показателя", colspan:1, rowspan:2},
        {field: "unit-of-measurement",label: "единица измерения", colspan:2, rowspan:1},
        {field: "valuesQualityIndicatorNextYear",label: "(очередной финансовый год)", colspan:1, rowspan:2},
        {field: "valuesQualityIndicatorFirstYear",label: "(1-й год планового периода)", colspan:1, rowspan:2},
        {field: "valuesQualityIndicatorSecondYear",label: "(2-й год планового периода)", colspan:1, rowspan:2},
        {field: "percentageDeviations",label: "в процентах", colspan:1, rowspan:2},
        {field: "absoluteValuesDeviations",label: "в абсолютных величинах", colspan:1, rowspan:2}
    ],
    //Шапка 3-го уровня таблицы
    subHeaders2:[
        {field:"unionOfMeasurement", label: "наименование"},
        {field:"OKEI",label: "единица измерения по ОКЕИ"}
    ],
    //Ячейки таблицы
    cols:[
        {field: "uniqueNumber"}, //Уникальный номер реестровой записи
        {field: "contendIndicator1"}, //Показатель, характеризующий содержание муниципальной услуги 1
        {field: "contendIndicator2"}, //Показатель, характеризующий содержание муниципальной услуги 2
        {field: "contendIndicator3"}, //Показатель, характеризующий содержание муниципальной услуги 3
        {field: "conditionIndicator1"}, //Показатель, характеризующий условия (формы) оказания муниципальной услуги 1
        {field: "conditionIndicator2"}, //Показатель, характеризующий условия (формы) оказания муниципальной услуги 2
        {field: "qualityIndicator"}, //Показатель качества муниципальной услуги: наименование показателя
        {field: "unionOfMeasurement"}, //Показатель качества муниципальной услуги: единица измерения: наименование
        {field: "OKEI"}, //Показатель качества муниципальной услуги: единица измерения: код по ОКЕИ
        {field: "valuesQualityIndicatorNextYear"}, //Значение показателя качества муниципальной услуги: (очередной финансовый год)
        {field: "valuesQualityIndicatorFirstYear"}, //Значение показателя качества муниципальной услуги: (1-й год планового периода)
        {field: "valuesQualityIndicatorSecondYear"}, //Значение показателя качества муниципальной услуги: (2-й год планового периода)
        {field: "percentageDeviations"}, //Допустимые (возможные) отклонения от установленных показателей качества муниципальной услуги: в процентах
        {field: "absoluteValuesDeviations"} //Допустимые (возможные) отклонения от установленных показателей качества муниципальной услуги: в абсолютных величинах
    ]
}