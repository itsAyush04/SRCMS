import os
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer

# Where to save the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'complaint_model.joblib')

def train_model():
    """Train a basic classifier on example complaints."""
    data = pd.DataFrame({
        'text': [
            'Food was stale and cold',
            'Train arrived 3 hours late',
            'Toilet was very dirty',
            'Staff was rude and unhelpful',
            'Coach was clean and well maintained'
        ],
        'label': [
            'Food Issue',
            'Delay',
            'Cleanliness',
            'Staff Behavior',
            'Cleanliness'
        ]
    })

    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', MultinomialNB())
    ])

    pipeline.fit(data['text'], data['label'])
    joblib.dump(pipeline, MODEL_PATH)

def predict_label(text):
    """Load model and return predicted label for input text."""
    if not os.path.exists(MODEL_PATH):
        train_model()

    model = joblib.load(MODEL_PATH)
    return model.predict([text])[0]



































































































