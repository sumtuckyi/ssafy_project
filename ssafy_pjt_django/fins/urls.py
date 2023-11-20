from django.urls import path
from . import views

urlpatterns = [
    path('save_deposits/', views.get_dep_data),
    path('save_savings/', views.get_sav_data),
    path('deposits/', views.deposit_list),
    path('savings/', views.savings_list),
    path('deposits/options/<pdt_pk>/', views.deposit_options),
    path('savings/options/<pdt_pk>/', views.saving_options),
    path('deposits/<pdt_pk>/', views.deposit_detail),
    path('savings/<pdt_pk>/', views.saving_detail),
    path('best/<type>/<per>/', views.filter_best),
]