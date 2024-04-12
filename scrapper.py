import requests
from bs4 import BeautifulSoup
import datetime
import json
import os

Headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
}
URL = "https://www.republika.co.id/"
page = requests.get(url=URL, headers=Headers)

if page.status_code == 200:
    obj = BeautifulSoup(page.content, "html.parser")
    data = obj.find('ul', class_='wrap-latest')
    news = []
else:
    print("Failed to fetch the webpage.")
    exit()

existingData = []
file = 'headlines.json'
if os.path.exists(file):
    with open(file, "r") as stored:
        existingData = json.load(stored)

for item in data.find_all('li', class_='conten1'):
    berita = {}
    berita['headline'] = item.find('h3').text.strip().replace('"', '')

    same = any(berita['headline'] in i['headline'] for i in existingData)
    if same:
        continue
    berita['category'] = item.find('span', class_='kanal-info').text if item.find('span', class_='kanal-info') else ''
    if not berita['category']:
        continue
    published = item.find('div', class_='date').text.strip().split()
    
    if len(published) > 2:
        berita['waktu_publish'] = ' '.join(published[-4:])
    elif len(published) == 5:
        berita['waktu_publish'] = ' '.join(published[-3:])

    berita['storing_time'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    news.append(berita)

existingData.extend(news)

with open(file, "w") as stored:
    json.dump(existingData, stored, indent=4)
