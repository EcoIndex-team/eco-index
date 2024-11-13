from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Keys
from selenium.webdriver.common.by import By
from time import sleep
from sys import argv

# chrome_options = Options()
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--window-size=%s" % "1920, 1080")
# driver = webdriver.Chrome(options=chrome_options)
driver = webdriver.Chrome()
has_ran = False
cookies_accepted = False
retries = 0
iterated_children = 2

class Stores:
  def __accept_cookies(css_path):
    global cookies_accepted

    if not cookies_accepted:
      accept_button = driver.find_element(by=By.CSS_SELECTOR, value=css_path)
      if accept_button.is_displayed():
        accept_button.send_keys(Keys.ENTER)
        cookies_accepted = True
  
  def __finish():
    global has_ran, cookies_accepted, retries

    has_ran = True
    cookies_accepted = False
    retries = 0
    driver.close()
    driver.quit()
  
  def __on_failure(scroll_down):
    global retries

    if retries >= 100:
      if scroll_down:
        driver.find_element(by=By.TAG_NAME, value='body').send_keys(Keys.ARROW_DOWN)

      sleep(0.2)
    elif retries >= 300:
      sleep(0.5)
    elif retries >= 500:
      sleep(1)
    retries += 1

  def ica():
    global has_ran, cookies_accepted, retries, iterated_children

    try:
      Stores.__accept_cookies("#onetrust-accept-btn-handler")

      has_been_met = False

      while not has_been_met:
        if iterated_children == 7:
          print('No ingredients found')
          break

        current_section = driver.find_element(by=By.CSS_SELECTOR, value=f"#product > div > div > div:nth-child({iterated_children})")

        if current_section.find_element(by=By.TAG_NAME, value="h2").text == "Ingredienser":
          print(current_section.find_element(by=By.TAG_NAME, value="p").text)
          has_been_met = True
        else:
          iterated_children += 1

      Stores.__finish()
    except:
      Stores.__on_failure(False)
      Stores.ica()
  
  def coop():
    global has_ran, cookies_accepted, retries

    try:
      Stores.__accept_cookies(".cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes")

      located_url = driver.find_element(by=By.CSS_SELECTOR, value=".ProductTeaser-media > a").get_attribute('href')
      driver.get(located_url)

      data = driver.find_element(by=By.CSS_SELECTOR, value="div[data-product-information='Produktfakta'] > div > button")
      data.send_keys(Keys.ENTER)

      ingredients = driver.find_element(by=By.CSS_SELECTOR, value=".mpl9oZN6.rnLahZtT > div > div")
      print(ingredients.text)

      Stores.__finish()
    except:
      Stores.__on_failure(True)
      Stores.coop()

def coop_actions():
  driver.get(f"https://www.coop.se/handla/sok/?q={argv[2]}")
  Stores.coop()

def ica_actions():
  # driver.get(f"https://handla.ica.se/produkt/{4011800569518}")
  driver.get(f"https://handla.ica.se/produkt/{argv[2]}")
  Stores.ica()

actions = {
  "coop": coop_actions,
  "ica": ica_actions
}

if not has_ran:
  actions[argv[1]]()