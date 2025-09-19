from django.http import HttpResponse
from gmu_converter.models import PlanPaymentIndex, PlanPaymentTRU, Organization
from gmu_converter.xml.generate_fhd import generate_xml
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def export_fhd_xml(request):
    org_id = request.GET.get('org_id')
    year = request.GET.get('year')

    if not org_id or not year:
        return HttpResponse("Missing parameters", status=400)

    try:
        organization = Organization.objects.get(id=org_id, user=request.user)
    except Organization.DoesNotExist:
        return HttpResponse("Организация не найдена или не принадлежит вам", status=403)

    # Получаем все строки, включая те, где суммы равны нулю
    index_data = PlanPaymentIndex.objects.filter(
        organization_id=org_id, 
        year=year
    ).order_by("lineCode")

    tru_data = PlanPaymentTRU.objects.filter(
        organization_id=org_id, 
        year=year
    ).order_by("lineCode")

    try:
        xml_data = generate_xml(index_data, tru_data, organization)
    except ValueError as e:
        return HttpResponse(str(e), status=400, content_type='text/plain; charset=utf-8')
    response = HttpResponse(xml_data, content_type='application/xml; charset=utf-8')
    response['Content-Disposition'] = f'attachment; filename="fhd_{org_id}_{year}.xml"'
    return response