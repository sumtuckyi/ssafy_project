from rest_framework import serializers

from .models import DepositProduct, DepositOption, SavingProduct, SavingOption


class DepositProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositProduct
        fields = '__all__'


class SavingProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingProduct
        fields = '__all__'


class DepositOptsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositOption
        fields = '__all__'
        read_only_fields = ('product',)


class SavingOptsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingOption
        fields = '__all__'
        read_only_fields = ('product',)


class DepProdOptSerializer(serializers.Serializer):
    ProdList = DepositProductsSerializer(many=True)
    OptList = DepositOptsSerializer(many=True)


class SavProdOptSerializer(serializers.Serializer):
    ProdList = SavingProductsSerializer(many=True)
    OptList = SavingOptsSerializer(many=True)
