from rest_framework import serializers
from .models import Article, ArticleComment


class ArticleCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleComment
        fields = '__all__'
        read_only_fields = ('article', 'user')


class ArticleSerializer(serializers.ModelSerializer):
    articlecomment_set = ArticleCommentSerializer(many=True, read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)