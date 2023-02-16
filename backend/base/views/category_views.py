from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Category
from base.serializers import CategorySerializer

from rest_framework import status


@api_view(['GET'])
def getCategories(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    categories = Category.objects.filter(
        name__icontains=query).order_by('name')

    page = request.query_params.get('page')
    paginator = Paginator(categories, 500)

    try:
        categories = paginator.page(page)
    except PageNotAnInteger:
        categories = paginator.page(1)
    except EmptyPage:
        categories = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = CategorySerializer(categories, many=True)
    return Response({'categories': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopCategorys(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategory(request, pk):
    category = Category.objects.get(_id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCategory(request):
    #category = request.category
    data = request.data

    category = Category.objects.create(
        name=data['name'],
        isActive=data['isActive']
    )

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCategory(request, pk):
    data = request.data
    category = Category.objects.get(_id=pk)

    category.name = data['name']

    category.save()

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCategory(request, pk):
    category = Category.objects.get(_id=pk)
    category.delete()
    return Response('Categoryed Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    category_id = data['category_id']
    category = Category.objects.get(_id=category_id)
    category.save()

    return Response('Image was uploaded')
