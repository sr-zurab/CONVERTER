# fields.py
from rest_framework import serializers

class NullableDecimalField(serializers.DecimalField):
    def to_internal_value(self, data):
        if data in ('', None):
            return None
        return super().to_internal_value(data)
