from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def insert_money(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        amount = int(data.get('amount', 0))
        balance = request.session.get('balance', 0)
        request.session['balance'] = balance + amount
        return JsonResponse({'balance': request.session['balance']})

@csrf_exempt
def reset_money(request):
    if request.method == 'POST':
        request.session['balance'] = 0
        return JsonResponse({'balance': request.session['balance']})

@csrf_exempt
def buy_drink(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        price = int(data.get('price', 0))
        balance = request.session.get('balance', 0)
        if balance >= price:
            request.session['balance'] = balance - price
            return JsonResponse({'balance': request.session['balance'], 'success': True})
        return JsonResponse({'balance': balance, 'success': False})

def get_balance(request):
    balance = request.session.get('balance', 0)
    return JsonResponse({'balance': balance})
