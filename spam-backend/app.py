from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app = Flask(__name__)
CORS(app)

print("Loading model and vectorizer...")
with open('spam_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    message = data.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400

    vect_message = vectorizer.transform([message])
    prediction = model.predict(vect_message)[0]
    proba = model.predict_proba(vect_message)[0][prediction]

    label = 'spam' if prediction == 1 else 'ham'
    return jsonify({'prediction': label, 'confidence': float(proba)})

if __name__ == '__main__':
    app.run(debug=True)
