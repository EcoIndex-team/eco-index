from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Keys
from selenium.webdriver.common.by import By
from time import sleep
from sys import argv

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=%s" % "1920, 1080")
driver = webdriver.Chrome(options=chrome_options)
# driver = webdriver.Chrome()
driver.get(f"https://www.coop.se/handla/sok/?q={argv[2]}")
has_ran = False

class Stores:
  def coop():
    global has_ran

    try:
      accept_button = driver.find_element(by=By.CSS_SELECTOR, value=".cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes")
      if accept_button.is_displayed():
        accept_button.send_keys(Keys.ENTER)

      located_url = driver.find_element(by=By.CSS_SELECTOR, value=".ProductTeaser-media > a").get_attribute('href')
      driver.get(located_url)

      data = driver.find_element(by=By.CSS_SELECTOR, value="div[data-product-information='Produktfakta'] > div > button")
      data.send_keys(Keys.ENTER)
      
      ingredients = driver.find_element(by=By.CSS_SELECTOR, value=".mpl9oZN6.rnLahZtT > div > div")

      print(ingredients.text)
      has_ran = True
      driver.close()
      driver.quit()
    except:
      Stores.coop()

if argv[1] == 'coop' and not has_ran:
  Stores.coop()