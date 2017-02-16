from django.conf.urls import url

from . import cmd

urlpatterns = [
    url(r'^$', cmd.index, name='index'),
    # ex: /polls/5/results/
    url(r'^(?P<question_id>[0-9]+)/results/$', cmd.results, name='results'),
    # ex: /polls/5/vote/
    url(r'^(?P<question_id>[0-9]+)/vote/$', cmd.vote, name='vote'),
]