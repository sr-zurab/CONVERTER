# Генерация и заполнение xml Плана ФХД
# UUID импорт и Datetime
import uuid
from xml.dom import minidom
from lxml import etree
import os
from gmu_converter.models import Organization

uuid.uuid4()
import datetime as DT

DT.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
# Парсинг в xml из xls отчет о результатах деятельности
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import tostring


def generate_xml(index_data, tru_data,org_data):
    year = None
    if index_data and hasattr(index_data[0], 'year'):
        year = index_data[0].year
    elif tru_data and hasattr(tru_data[0], 'year'):
        year = tru_data[0].year
    else:
        year = '0000'

    # заголовок xml
    financialActivityPlan2020 = ET.Element('{http://bus.gov.ru/external/1}financialActivityPlan2020')
    header_financialActivityPlan2020 = ET.SubElement(financialActivityPlan2020, '{http://bus.gov.ru/types/1}header')
    body_financialActivityPlan2020 = ET.SubElement(financialActivityPlan2020, '{http://bus.gov.ru/external/1}body')

    # header
    id = ET.SubElement(header_financialActivityPlan2020, '{http://bus.gov.ru/types/1}id')
    id.text = str(uuid.uuid4())
    creatDateTime = ET.SubElement(header_financialActivityPlan2020, '{http://bus.gov.ru/types/1}createDateTime')
    creatDateTime.text = str(DT.datetime.now().strftime('%Y-%m-%dT%H:%M:%S'))

    # body
    position = ET.SubElement(body_financialActivityPlan2020, '{http://bus.gov.ru/external/1}position')
    position_id = ET.SubElement(position, '{http://bus.gov.ru/types/1}positionId')
    position_id.text = str(uuid.uuid4())
    position_changeDate = ET.SubElement(position, '{http://bus.gov.ru/types/1}changeDate')
    position_changeDate.text = str(DT.datetime.now().strftime('%Y-%m-%dT%H:%M:%S'))
    position_financialYear = ET.SubElement(position, '{http://bus.gov.ru/types/3}financialYear')
    position_financialYear.text = str(year)
    position_generalData = ET.SubElement(position, '{http://bus.gov.ru/types/3}generalData')

    # generalData
    generalData_date = ET.SubElement(position_generalData, '{http://bus.gov.ru/types/3}date')
    generalData_date.text = str(DT.datetime.now().strftime('%Y-%m-%d'))
    generalData_dateApprovel = ET.SubElement(position_generalData, '{http://bus.gov.ru/types/3}dateApprovel')
    generalData_dateApprovel.text = str(DT.datetime.now().strftime('%Y-%m-%d'))

    # founderAuthority
    generalData_founderAuthority = ET.SubElement(position_generalData, '{http://bus.gov.ru/types/3}founderAuthority')
    founderAuthority_regNum = ET.SubElement(generalData_founderAuthority, '{http://bus.gov.ru/types/1}regNum')
    founderAuthority_regNum.text = org_data.founderAuthority if org_data and org_data.founderAuthority else '00000000'

    # generalData продолжение
    # okei
    generalData_okei = ET.SubElement(position_generalData, '{http://bus.gov.ru/types/3}okei')
    okei_code = ET.SubElement(generalData_okei, '{http://bus.gov.ru/types/1}code')
    okei_code.text = '383'

    # position_planPaymentIndex
    for item in index_data:
        position_planPaymentIndex = ET.SubElement(position, '{http://bus.gov.ru/types/3}planPaymentIndex')
        name = ET.SubElement(position_planPaymentIndex, '{http://bus.gov.ru/types/3}name')
        name.text = str(item.name)
        lineCode = ET.SubElement(position_planPaymentIndex, '{http://bus.gov.ru/types/3}lineCode')
        lineCode.text = item.lineCode
        kbk = ET.SubElement(position_planPaymentIndex, '{http://bus.gov.ru/types/3}kbk')
        kbk_value = str(item.kbk)
        if kbk_value in ('X', '', 'None', 'Non', None):
            kbk_value = '000'
        kbk.text = kbk_value[:3] if len(kbk_value) > 3 else kbk_value
        analyticCode = ET.SubElement(position_planPaymentIndex, '{http://bus.gov.ru/types/3}analyticCode')
        analyticCode.text = str(item.analyticCode if item.analyticCode == 'X' else '000')
        manually = ET.SubElement(position_planPaymentIndex, '{http://bus.gov.ru/types/3}manually')
        manually.text = '1' if item.manually else '0'
        Sum = ET.SubElement(position_planPaymentIndex, '{http://bus.gov.ru/types/3}sum')

        # Sum
        financialYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}financialYearSum')
        financialYearSum.text = str(item.financialYearSum if item.financialYearSum is not None else 0)
        planFirstYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}planFirstYearSum')
        planFirstYearSum.text = str(item.planFirstYearSum if item.planFirstYearSum is not None else 0)
        planLastYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}planLastYearSum')
        planLastYearSum.text = str(item.planLastYearSum if item.planLastYearSum is not None else 0)
        AutPlanYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}autPlanYearSum')
        AutPlanYearSum.text = str(item.AutPlanYearSumm if item.AutPlanYearSumm is not None else 0)

    # position_planPaymentTRU
    for item in tru_data:
        position_planPaymentTRU = ET.SubElement(position, '{http://bus.gov.ru/types/3}planPaymentTRU')
        name = ET.SubElement(position_planPaymentTRU, '{http://bus.gov.ru/types/3}name')
        name.text = str(item.name)
        lineCode = ET.SubElement(position_planPaymentTRU, '{http://bus.gov.ru/types/3}lineCode')
        lineCode.text = item.lineCode
        manually = ET.SubElement(position_planPaymentTRU, '{http://bus.gov.ru/types/3}manually')
        manually.text = '1' if item.manually else '0'
        Sum = ET.SubElement(position_planPaymentTRU, '{http://bus.gov.ru/types/3}sum')
        financialYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}financialYearSum')
        financialYearSum.text = str(item.financialYearSum if item.financialYearSum is not None else 0)
        planFirstYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}planFirstYearSum')
        planFirstYearSum.text = str(item.planFirstYearSum if item.planFirstYearSum is not None else 0)
        planLastYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}planLastYearSum')
        planLastYearSum.text = str(item.planLastYearSum if item.planLastYearSum is not None else 0)
        AutPlanYearSum = ET.SubElement(Sum, '{http://bus.gov.ru/types/3}autPlanYearSum')
        AutPlanYearSum.text = str(item.AutPlanYearSumm if item.AutPlanYearSumm is not None else 0)

    # Этот блок был с неправильным отступом, выносим его из цикла
    rough_string = ET.tostring(financialActivityPlan2020, encoding='utf-8', method='xml')
    reparsed = minidom.parseString(rough_string)
    pretty_xml = reparsed.toprettyxml(indent="  ", encoding='utf-8')

    # === Валидация по XSD ===
    xsd_path = os.path.join(os.path.dirname(__file__), 'ТФФ 1.8', 'External.xsd')
    xml_doc = etree.fromstring(rough_string)
    with open(xsd_path, 'rb') as f:
        schema_doc = etree.parse(f)
        schema = etree.XMLSchema(schema_doc)
    if not schema.validate(xml_doc):
        error = schema.error_log.last_error
        # Пытаемся получить имя тега и значение, если возможно
        tag_info = ''
        try:
            error_line = error.line
            error_column = error.column
            lines = rough_string.decode('utf-8').split('\n')
            if 0 < error_line <= len(lines):
                line = lines[error_line - 1]
                import re
                tag_match = re.search(r'<([\w:]+)[^>]*>([^<]*)', line)
                if tag_match:
                    tag_info = f"\nТег: <{tag_match.group(1)}>\nЗначение: {tag_match.group(2).strip()}"
        except Exception:
            pass
        raise ValueError(f'Ошибка валидации XML!\nОписание: {error.message}\nСтрока: {error.line}, столбец: {error.column}{tag_info}\nПроверьте корректность заполнения данных.')

    return pretty_xml
