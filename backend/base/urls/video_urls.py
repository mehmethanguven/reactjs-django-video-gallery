from django.urls import path
from base.views import video_views as views

urlpatterns = [
    path('', views.getVideos, name="servers"),
    path('related/<str:pk>/', views.getRelatedVideos, name="servers-related"),
    path('create/', views.createVideo, name="server-create"),
    path('<str:pk>/', views.getVideo, name="server"),
    path('delete/<str:pk>/', views.deleteVideo, name="server-delete"),
]
