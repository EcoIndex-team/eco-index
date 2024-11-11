from requests_html import HTMLSession
# __chromium_revision__ = '1263111'
from sys import argv
import time

session = HTMLSession()

url = ''
url1 = argv[1]
# r = session.get(url1)
# r.html.render(sleep=1, keep_page=False, scrolldown=1)

# product1 = ''

# if argv[2] == 'find':
#   product1 = r.html.find(argv[3])
# elif argv[2] == 'search': 
#   product1 = r.html.search(argv[3])
r = session.get("https://www.coop.se/handla/varor/mejeri-agg/mjolk/mellanmjolk/mellanmjolk-7300156486318")
# r.html.render(sleep=1, keep_page=True, scrolldown=1)
r.html.render()
# "B6JQ8bRz odcxhOBR uQoAqqx6 n1yxWvZ1"

script = """() => {
    setTimeout(() => {
        document.querySelector('.B6JQ8bRz.odcxhOBR.uQoAqqx6.n1yxWvZ1  button').click();

    }, 5000)
  }"""

r.html.render(script=script, sleep=5)
# print(r.html)

product1 = ''
time.sleep(6)

if argv[2] == 'find':
  product1 = r.html.find(argv[3])
elif argv[2] == 'search': 
  product1 = r.html.search(argv[3])

r.close()
session.close()

for item in product1:
  print(item)