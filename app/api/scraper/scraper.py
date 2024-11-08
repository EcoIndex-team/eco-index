from requests_html import HTMLSession
# __chromium_revision__ = '1263111'
from sys import argv

session = HTMLSession()

url = ''
url1 = argv[1]
r = session.get(url1)
r.html.render(sleep=1, keep_page=False, scrolldown=1)

product1 = ''

if argv[2] == 'find':
  product1 = r.html.find(argv[3])
elif argv[2] == 'search': 
  product1 = r.html.search(argv[3])

r.close()
session.close()

for item in product1:
  print(item)