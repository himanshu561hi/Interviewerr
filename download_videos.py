import urllib.request
import json
import os

# Using Pixabay API (demo key or free search)
# Pixabay requires an API key. I will try a public open video from pexels or coverr.
# Coverr direct links:
female_url = "https://coverr.co/s3/mp4/Business-Woman.mp4" 
male_url = "https://coverr.co/s3/mp4/Business-Man.mp4"

try:
    print("Downloading female video...")
    urllib.request.urlretrieve("https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-1259-large.mp4", "public/female.mp4")
except Exception as e:
    print(e)
