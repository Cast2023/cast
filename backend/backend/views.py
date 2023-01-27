from django.shortcuts import render
from django.http import HttpResponseRedirect
from backend.models import Skeleton, Techs
from backend.forms import SkeletonForms


from rest_framework import viewsets
from .serializers import SkeletonSerializer, TechSerializer


def index(request):
    return render(request, 'backend/index.html')

def skeleton(request):
    skeleton_content = Skeleton.objects.all().values()
    return render(request, 'backend/skeleton.html', {'content': skeleton_content})

def skeleton_post(request):

    if request.method == 'POST':
       # print(request.POST.get("test_text"))
        form = SkeletonForms(request.POST)
        if form.is_valid():
            skeleton_content = form.cleaned_data['test_text']
            print(skeleton_content)
            Skeleton.objects.create(content = skeleton_content)
            return HttpResponseRedirect('/backend/skeleton')
    else:
        form = SkeletonForms()

    return render(request, 'backend/skeleton.html', {'form': form})

class SkeletonAPIView(viewsets.ModelViewSet):
    serializer_class = SkeletonSerializer
    queryset = Skeleton.objects.all()

class TechAPIView(viewsets.ModelViewSet):
    serializer_class = TechSerializer
    queryset = Techs.objects.all()