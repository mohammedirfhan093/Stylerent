from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings
from google import genai
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)

@api_view(['POST'])
@permission_classes([AllowAny])
def ai_recommend(request):
    occasion = request.data.get('occasion', '')
    budget = request.data.get('budget', '')
    preferences = request.data.get('preferences', '')
    prompt = f"""I need a fashion outfit recommendation for a rental platform.
    Occasion: {occasion}
    Budget per day: {budget} rupees
    Preferences: {preferences}
    Suggest 3 specific outfit types from these categories: saree, lehenga, suit, gown, jewellery.
    For each suggest the type, why it fits the occasion, and estimated price range."""
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt
    )
    return Response({'recommendation': response.text})

@api_view(['POST'])
@permission_classes([AllowAny])
def ai_search(request):
    description = request.data.get('description', '')
    prompt = f"""Convert this fashion search description into search filters.
    Description: '{description}'
    Return ONLY a JSON object with these fields:
    - category (one of: saree, lehenga, suit, gown, jewellery, other)
    - max_price (number or null)
    - size (or null)
    - keywords (short search term)
    No explanation, just JSON."""
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt
    )
    try:
        text = response.text.replace('```json', '').replace('```', '').strip()
        filters = json.loads(text)
    except Exception:
        filters = {'keywords': description}
    return Response({'filters': filters})