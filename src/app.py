import feedparser
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['wakandan_app']
collection = db['rss_feeds']

# Function to extract image URL from RSS entry
def extract_image(entry):
    if 'media_content' in entry:
        return entry['media_content'][0]['url']
    elif 'media_thumbnail' in entry:
        return entry['media_thumbnail'][0]['url']
    elif 'enclosure' in entry:
        return entry['enclosure']['url']
    return None

@app.route('/api/rss_feeds', methods=['GET'])
def get_rss_feeds():
    feeds = list(collection.find({}, {'_id': 0}))
    for feed in feeds:
        if 'image' not in feed or not feed['image']:
            feed['image'] = extract_image(feed)
    return jsonify(feeds)

if __name__ == '__main__':
    app.run(debug=True)
