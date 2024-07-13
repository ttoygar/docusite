from django.contrib import admin
from .models import Document, Category


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('author', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)
