from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

# Create your views here.
def index(request):
	ret, reason = '001', u'succress'
	return JsonResponse({'ret':ret, 'reason':reason})

def detail(request):
    return HttpResponse("You're looking at question")

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)    