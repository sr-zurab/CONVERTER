from openpyxl import load_workbook
from openpyxl.styles import Border, Side, Alignment
from openpyxl.utils import get_column_letter, column_index_from_string
from MBDOU_INF.models import PlanPaymentIndex, PlanPaymentTRU, Organization
from copy import copy
import os
from io import BytesIO


def export_plan_fhd_to_memory(org_id, year):
    org = Organization.objects.get(id=org_id)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.normpath(os.path.join(base_dir, '..', 'templates', 'plan_template.xlsx'))

    wb = load_workbook(template_path)

    # === ЛИСТ 1 ===
    ws1 = wb['Листы1-5']
    header_row_1 = 31
    merged_to_clone_1 = [(r.min_col, r.max_col) for r in ws1.merged_cells.ranges if r.min_row == header_row_1]

    column_map_1 = {
        cell.value: cell.column for cell in ws1[header_row_1] if isinstance(cell.value, int)
    }
    columns_1 = [column_map_1[i] for i in range(1, 9)]
    data_1 = PlanPaymentIndex.objects.filter(organization=org, year=year).order_by('lineCode')
    thin = Side(style='thin')

    for i, row in enumerate(data_1):
        row_index = 32 + i
        values = [
            row.name,
            row.lineCode,
            row.kbk,
            row.analyticCode,
            row.financialYearSum,
            row.planFirstYearSum,
            row.planLastYearSum,
            row.AutPlanYearSumm
        ]
        for j, col in enumerate(columns_1):
            src_cell = ws1.cell(row=header_row_1, column=col)
            cell = ws1.cell(row=row_index, column=col, value=values[j])
            cell.font = copy(src_cell.font)
            cell.fill = copy(src_cell.fill)
            cell.border = Border(left=thin, right=thin, top=thin, bottom=thin)
            cell.alignment = Alignment(horizontal=src_cell.alignment.horizontal,
                                       vertical=src_cell.alignment.vertical, wrap_text=True)
            cell.number_format = copy(src_cell.number_format)
            cell.protection = copy(src_cell.protection)
        ws1.row_dimensions[row_index].height = 35
        for min_col, max_col in merged_to_clone_1:
            ws1.merge_cells(f'{get_column_letter(min_col)}{row_index}:{get_column_letter(max_col)}{row_index}')

    # === ЛИСТ 2 ===
    ws2 = wb['Листы6-7']
    header_row_2 = 8
    column_letters_2 = ['A', 'F', 'BD', 'BJ', 'BP', 'BX', 'CF', 'CN']
    columns_2 = [column_index_from_string(letter) for letter in column_letters_2]
    merged_to_clone_2 = [(r.min_col, r.max_col) for r in ws2.merged_cells.ranges if r.min_row == header_row_2]

    data_2 = PlanPaymentTRU.objects.filter(organization=org, year=year).order_by('lineCode')

    for i, row in enumerate(data_2):
        row_index = 9 + i
        values = [
            row.lineNum,
            row.name,
            row.lineCode,
            row.yearStart,
            row.financialYearSum,
            row.planFirstYearSum,
            row.planLastYearSum,
            row.AutPlanYearSumm
        ]
        for j, col in enumerate(columns_2):
            src_cell = ws2.cell(row=header_row_2, column=col)
            cell = ws2.cell(row=row_index, column=col, value=values[j])
            cell.font = copy(src_cell.font)
            cell.fill = copy(src_cell.fill)
            cell.border = Border(left=thin, right=thin, top=thin, bottom=thin)
            cell.alignment = Alignment(horizontal=src_cell.alignment.horizontal,
                                       vertical=src_cell.alignment.vertical, wrap_text=True)
            cell.number_format = copy(src_cell.number_format)
            cell.protection = copy(src_cell.protection)
        ws2.row_dimensions[row_index].height = 35
        for min_col, max_col in merged_to_clone_2:
            ws2.merge_cells(f'{get_column_letter(min_col)}{row_index}:{get_column_letter(max_col)}{row_index}')

    # Сохраняем в память
    buffer = BytesIO()
    wb.save(buffer)
    buffer.seek(0)
    return buffer, org.name.replace(" ", "_"), year