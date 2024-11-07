from requests_html import HTMLSession
# __chromium_revision__ = '1263111'
from sys import argv

session = HTMLSession()

url = ''
url1 = argv[1]
# print(url1)
# print(argv[1])
# print(argv[3])
r = session.get(url1)
r.html.render(sleep=1, keep_page=False, scrolldown=1)

product1 = ''

if argv[2] == 'find':
  product1 = r.html.find(argv[3])
elif argv[2] == 'search': 
  product1 = r.html.search(argv[3])

# session.close()
r.close()

# # print(product1)
# r2 = session.get(argv[4] + product1[0])
# # script = """
# #   () => {return document.querySelector(".B6JQ8bRz.odcxhOBR.uQoAqqx6.n1yxWvZ1 div[data-product-information='Produktfakta'] div button.a9ShLV3j").click();}
# # """
# r2.html.render(sleep=1, keep_page=False, scrolldown=1)
# # print(argv[4] + product1[0])
# # print(argv[4])
# # print(product1[0])

# product2 = ''

# if argv[5] == 'find':
#   product2 = r2.html.find(argv[6], containing='Produktfakta')
# elif argv[5] == 'search': 
#   product2 = r2.html.search(argv[6])
# print(product2)

# print(r.html)
# argv = []
session.close()
# r2.close()
# print(product, end='\n')
for item in product1:
  print(item)