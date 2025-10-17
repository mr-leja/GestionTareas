
from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path('login', views.login, name='login'),
    re_path('registrer', views.registrer, name='registrer'),
    re_path('profile', views.profile, name='profile'),
    re_path('logout', views.logout, name='logout'),
]
