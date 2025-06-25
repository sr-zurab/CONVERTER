# Представление для экспорта плана ФХД в XLSX-файл
from django.http import FileResponse, JsonResponse
from MBDOU_INF.xlsx.export_plan_fhd_to_xlsx import export_plan_fhd_to_file_object
from MBDOU_INF.models import Organization
import traceback
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class export_fhd_xlsx(APIView):
    permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей

    # Обработка POST-запроса на экспорт
    def post(self, request):
        org_id = request.POST.get('org_id')
        year = request.POST.get('year')

        # Проверка наличия обязательных параметров
        if not org_id or not year:
            return JsonResponse({'error': 'org_id и year обязательны'}, status=400)

        # Проверка, что организация принадлежит пользователю
        try:
            Organization.objects.get(id=org_id, user=request.user)
        except Organization.DoesNotExist:
            return JsonResponse({'error': 'Организация не найдена или не принадлежит вам'}, status=403)

        try:
            # Генерация XLSX-файла
            file_object, org_name, year = export_plan_fhd_to_file_object(int(org_id), int(year))
            
            filename = f"План_ФХД_{org_name}_{year}.xlsx"
            response = FileResponse(
                file_object,
                as_attachment=True,
                filename=filename,
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
            # Корректная обработка имени файла и заголовков
            response['Content-Disposition'] = f'attachment; filename*=UTF-8\'\'{filename}'
            response['Access-Control-Expose-Headers'] = 'Content-Disposition'
            
            return response

        except Exception as e:
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)