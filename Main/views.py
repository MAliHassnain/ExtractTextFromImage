from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import TextFromImage.settings as Settings
from PIL import Image
import pytesseract
from django.core.files.storage import FileSystemStorage
import os
import glob
import requests
from io import BytesIO
import re

# Create your views here.
def Index(request):
    return render(request, 'Index.html', {})

def ProceedImage(request):
    if request.method == 'POST':
        if request.is_ajax():
            files = glob.glob('media/*')
            for f in files:
                os.remove(f)
            pytesseract.pytesseract.tesseract_cmd = Settings.Tesseract_OCR_Path
            image = request.FILES.get('Image')
            fs = FileSystemStorage()
            fs.save(image.name, image)

            savedImage = Image.open('media/'+image.name)

            text = pytesseract.image_to_string(savedImage)
            return JsonResponse({'status': True, 'Text': text})

    return JsonResponse({'staus': False})

def ProceedImageUrl(request):
    if request.method == 'POST':
        if request.is_ajax():
            url = request.POST['ImageUrl']
            if(url!=None):
                try:
                    if not re.match('(?:http|ftp|https)', url):
                        if not re.match('(?://)', url):
                            url = 'http://{}'.format(url)
                        else:
                            url = 'http:{}'.format(url)
                    response = requests.get(url)
                    if(response.status_code!=404):
                        imageFile = Image.open(BytesIO(response.content))
                        text = pytesseract.image_to_string(imageFile)
                        return JsonResponse({'status': True, 'Text': text})
                    else:
                        JsonResponse({'status': False})
                        
                except Exception:
                    JsonResponse({'status': False})
            else:
                JsonResponse({'status': False})
        
    return JsonResponse({'staus': False})
