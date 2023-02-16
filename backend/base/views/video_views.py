from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.fields import IntegerField
from rest_framework.permissions import IsAuthenticated, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from backend.settings import VIDEO_ROOT

from base.models import Video, Category
from base.serializers import VideoSerializer

from rest_framework import status


@api_view(['GET'])
def getVideos(request):

    videos = Video.objects.all().order_by('_id')
    page = request.query_params.get('page')
    paginator = Paginator(videos, 1000)

    try:
        videos = paginator.page(page)
    except PageNotAnInteger:
        videos = paginator.page(1)
    except EmptyPage:
        videos = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = VideoSerializer(videos, many=True)
    return Response({'videos': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getRelatedVideos(request, pk):
    video = Video.objects.get(_id=pk)
    serializer = VideoSerializer(video, many=False)
    categoryId = serializer.data['category']['_id']

    videos = Video.objects.filter(
        category=categoryId).exclude(_id=pk).order_by('_id')
    page = request.query_params.get('page')
    paginator = Paginator(videos, 5)

    try:
        videos = paginator.page(page)
    except PageNotAnInteger:
        videos = paginator.page(1)
    except EmptyPage:
        videos = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = VideoSerializer(videos, many=True)
    return Response({'videos': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getVideo(request, pk):
    video = Video.objects.get(_id=pk)
    serializer = VideoSerializer(video, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createVideo(request):
    data = request.data
    file = request.data['file']
    handle_uploaded_file(file)

    category = Category.objects.get(_id=int(data['category']))
    #print('category', category)
    video = Video.objects.create(
        category=category,
        title=data['title'],
        url=file.name)
    serializer = VideoSerializer(video, many=False)
    return Response(serializer.data)


def handle_uploaded_file(f):
    with open(VIDEO_ROOT/f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteVideo(request, pk):
    video = Video.objects.get(_id=pk)
    video.delete()
    return Response('Videoed Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    video_id = data['video_id']
    video = Video.objects.get(_id=video_id)
    video.save()

    return Response('Image was uploaded')
