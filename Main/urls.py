from django.urls import path
from Main import views


urlpatterns = [
    path('', views.Index, name='Index'),
    path('Main/ProceedImage', views.ProceedImage, name='ProceedImage'),
    path('Main/ProceedImageUrl', views.ProceedImageUrl, name='ProceedImageUrl'),
    
]
