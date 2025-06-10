import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

print("Loading dataset...")
url = "https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv"
df = pd.read_csv(url, sep='\t', header=None, names=["label", "message"])

df['label_num'] = df.label.map({'ham': 0, 'spam': 1})

X = df['message']
y = df['label_num']

print("Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Vectorizing text...")
vectorizer = TfidfVectorizer(stop_words='english')
X_train_vec = vectorizer.fit_transform(X_train)

print("Training model...")
model = LogisticRegression()
model.fit(X_train_vec, y_train)

print("Saving model and vectorizer...")
with open('spam_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

print("Training complete! Files saved: spam_model.pkl, vectorizer.pkl")
