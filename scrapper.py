import requests
from bs4 import BeautifulSoup
import datetime
import json

Headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
URL = "https://www.republika.co.id/"
page = requests.get(url=URL, headers=Headers)

if page.status_code == 200:
    obj = BeautifulSoup(page.content, "html.parser")
    data = obj.find('ul', class_='wrap-latest')
    news = []
else:
    print("Failed to fetch the webpage.")

with open("data_web.json", "r") as stored:
    existingData = json.load(stored)

existingData.extend(news)
file = 'data_web.json'
with open(file, "w") as stored:
    json.dump(existingData, stored, indent=4)

table_rows = ""

for item in data.find_all('li', class_='conten1'):
    berita = {}
    berita['headline'] = item.find('h3').text.strip().replace('"', '')
    berita['link'] = URL + item.find('a')['href'] if item.find('a') else ''
    same = any(berita['headline'] in i['headline'] for i in existingData)
    if same:
        continue
    berita['category'] = item.find('span', class_='kanal-info').text if item.find('span', class_='kanal-info') else ''
    if not berita['category']:
        continue
    published = item.find('div', class_='date').text.strip().split()

    if len(published) > 2:
        berita['publish_time'] = ' '.join(published[:len(published) - 3]) + ' ' + ' '.join(published[-3:])
    elif len(published) == 5:
        berita['publish_time'] = ' '.join(published[-3:])
        berita['storing_time'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    news.append(berita)

existingData.extend(news)
file = 'data_web.json'

with open(file, "w") as stored:
    json.dump(existingData, stored, indent=4)

for idx, item in enumerate(news, start=1):
    table_rows += f"""
    <tr>
        <td class="border">{idx}</td>
        <td class="border"><a href="{item['link']}" target="_blank">{item['headline']}</a></td>
        <td class="border">{item['category']}</td>
        <td class="border">{item['publish_time']}</td>
        <td class="border">{item.get('storing_time', '')}</td>
    </tr>
    """

with open("scrapping.html", "r") as html_file:
    html_content = html_file.read()

index = html_content.find("</tbody>")
if index != -1:
    updated_html_content = html_content[:index] + table_rows + html_content[index:]
else:
    updated_html_content = html_content + table_rows

with open("scrapping.html", "w") as html_file:
    html_file.write(updated_html_content)
