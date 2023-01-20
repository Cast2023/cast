from django import forms

class SkeletonForms(forms.Form):
    test_text = forms.CharField()