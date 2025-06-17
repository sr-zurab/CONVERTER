import traceback

from django.views import View
from django.http import FileResponse, JsonResponse
from MBDOU_INF.xlsx.export_plan_fhd_to_xlsx import export_plan_fhd_to_memory
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
@method_decorator(csrf_exempt, name='dispatch')
class export_fhd_xlsx(View):
    def post(self, request):
        org_id = request.POST.get('org_id')
        year = request.POST.get('year')

        if not org_id or not year:
            return JsonResponse({'error': 'org_id и year обязательны'}, status=400)

        try:
            buffer, org_name, year = export_plan_fhd_to_memory(int(org_id), int(year))
            filename = f"План_ФХД_{org_name}_{year}.xlsx"

            return FileResponse(
                buffer,
                as_attachment=True,
                filename=filename,
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)