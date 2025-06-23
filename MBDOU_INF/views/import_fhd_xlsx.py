from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from openpyxl import load_workbook
from MBDOU_INF.models import PlanPaymentIndex, PlanPaymentTRU, Organization
import json

class ImportPlanFhdXLSXView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        org_id = request.data.get('org_id')
        year = request.data.get('year')
        default_codes_list1 = json.loads(request.data.get('default_codes_list1', '[]'))
        default_codes_list2 = json.loads(request.data.get('default_codes_list2', '[]'))

        if not file or not org_id or not year:
            return Response({'error': 'Недостаточно данных'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            organization = Organization.objects.get(pk=org_id)
        except Organization.DoesNotExist:
            return Response({'error': 'Организация не найдена'}, status=status.HTTP_404_NOT_FOUND)

        try:
            wb = load_workbook(filename=file, data_only=True)
            ws1 = wb['Листы1-5']
            ws2 = wb['Листы6-7']

            # Удаляем старые записи
            PlanPaymentIndex.objects.filter(organization=organization, year=year).delete()
            PlanPaymentTRU.objects.filter(organization=organization, year=year).delete()

            # === ЛИСТ 1 ===
            row_num = 32
            while True:
                line_code = ws1[f"AV{row_num}"].value
                if line_code is None:
                    break

                name = ws1[f"A{row_num}"].value
                kbk = ws1[f"AZ{row_num}"].value
                analytic_code = ws1[f"BF{row_num}"].value
                f_sum = ws1[f"BL{row_num}"].value
                p1_sum = ws1[f"BU{row_num}"].value
                p2_sum = ws1[f"CD{row_num}"].value
                auto_sum = ws1[f"CM{row_num}"].value

                manually = str(line_code) not in default_codes_list1
                after_code = None

                if manually:
                    for prev in reversed(default_codes_list1):
                        if str(prev) < str(line_code):
                            after_code = prev
                            break

                PlanPaymentIndex.objects.create(
                    organization=organization,
                    year=year,
                    name=name,
                    lineCode=line_code,
                    kbk=kbk,
                    analyticCode=analytic_code,
                    financialYearSum=f_sum,
                    planFirstYearSum=p1_sum,
                    planLastYearSum=p2_sum,
                    AutPlanYearSumm=auto_sum,
                    manually=manually,
                    afterLineCode=after_code
                )

                row_num += 1

            # === ЛИСТ 2 ===
            row_num = 9
            while True:
                line_code = ws2[f"BD{row_num}"].value
                if line_code is None:
                    break

                line_num = ws2[f"A{row_num}"].value
                name = ws2[f"F{row_num}"].value
                year_start = ws2[f"BJ{row_num}"].value
                f_sum = ws2[f"BP{row_num}"].value
                p1_sum = ws2[f"BX{row_num}"].value
                p2_sum = ws2[f"CF{row_num}"].value
                auto_sum = ws2[f"CN{row_num}"].value

                manually = str(line_code) not in default_codes_list2
                after_code = None

                if manually:
                    for prev in reversed(default_codes_list2):
                        if str(prev) < str(line_code):
                            after_code = prev
                            break

                PlanPaymentTRU.objects.create(
                    organization=organization,
                    year=year,
                    lineNum=line_num,
                    name=name,
                    lineCode=line_code,
                    yearStart=year_start,
                    financialYearSum=f_sum,
                    planFirstYearSum=p1_sum,
                    planLastYearSum=p2_sum,
                    AutPlanYearSumm=auto_sum,
                    manually=manually,
                    afterLineCode=after_code
                )

                row_num += 1

            return Response({'status': 'ok'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)