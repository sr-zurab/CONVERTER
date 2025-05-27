from django.http import HttpResponse
from django.views.decorators.http import require_GET
from MBDOU_INF.models import PlanPaymentIndex, PlanPaymentTRU
from MBDOU_INF.xml.generate_fhd import generate_xml


@require_GET
def export_fhd_xml(request):
    org_id = request.GET.get('org_id')
    year = request.GET.get('year')

    if not org_id or not year:
        return HttpResponse("Missing parameters", status=400)

    index_data = PlanPaymentIndex.objects.filter(organization_id=org_id, year=year).order_by("lineCode")
    tru_data = PlanPaymentTRU.objects.filter(organization_id=org_id, year=year).order_by("lineCode")

    xml_data = generate_xml(index_data, tru_data)

    response = HttpResponse(xml_data, content_type='application/xml; charset=utf-8')
    response['Content-Disposition'] = f'attachment; filename="fhd_{org_id}_{year}.xml"'
    return response
