from requests_html import HTMLSession
# __chromium_revision__ = '1263111'
from sys import argv

session = HTMLSession()

url = ''
url = argv[1]
# print(url)
# print(argv[1])
# print(argv[3])
r = session.get(url)
r.html.render(sleep=1, keep_page=True, scrolldown=1)

product = ''

if argv[2] == 'find':
  product = r.html.find(argv[3])
elif argv[2] == 'search': 
  product = r.html.search(argv[3])

# print(r.html)
argv = []
session.close()
r.close()
# print(product, end='\n')
for item in product:
  print(item)