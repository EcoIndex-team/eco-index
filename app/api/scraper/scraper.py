from requests_html import HTMLSession
# __chromium_revision__ = '1263111'
import sys

session = HTMLSession()

url = f"https://www.coop.se/handla/sok/?q={sys.argv[0]}"

r = session.get(url)
r.html.render(sleep=1, keep_page=True, scrolldown=1)

product = ''

if sys.argv[1] == 'find':
  product = r.html.find(sys.argv[2])
else: 
  product = r.html.search('href="/handla/varor/{}"')

# print(r.html)
for item in product:
  print(item)