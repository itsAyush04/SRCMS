from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import predict_label

@api_view(['POST'])
def classify_complaint(request):
    """API endpoint to classify complaint text."""
    text = request.data.get("text")
    if not text:
        return Response({"error": "Missing 'text' field"}, status=400)

    label = predict_label(text)
    return Response({"predicted_label": label})
