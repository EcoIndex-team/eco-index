import scraperResultRetriever from "./scraperResultRetriever"

const levelsOfHarm = new Map([
  ['lxg risk', 1],
  ['relativt lxg', 2],
  ['medelhxg risk', 3],
  ['relativt hxg risk', 4],
  ['mycket hxg risk', 5],
])

const commonHarmfullIngredientsIndication = new Map([
  ['palmolja', 3], ['socker', 2], ['glukosfruktossirap', 2], ['glukossirap', 2], ['sockersirap', 2],
  ['vete', 1], ['havre', 1], ['rxg', 1], ['korn', 1], ['ris', 1], ['majs', 1], ['rapsolja', 2], ['mjxlk', 2], ['kakao', 2]
])

const commonHarmfullIngredientsList = [
  'palmolja', 'socker', 'glukosfruktossirap', 'glukossirap', 'sockersirap',
  'vete', 'havre', 'rxg', 'korn', 'ris', 'majs', 'rapsolja', 'mjxlk', 'kakao'
]

export default async function scraperApi(firstScrape: Scrape) {
  const data = await scraperResultRetriever(firstScrape.storeName, firstScrape.barcode)
  const ingredients =
    data.replaceAll('�', 'x')
      .replace('INGREDIENSER: ', '')
      .toLowerCase()
      .split('kan innehxlla')[0]

  const dataArray = data.split('>\r\n<')
  let harmIndication = 0
  let allIngredientsIndication = 0

  ingredients.match(new RegExp(commonHarmfullIngredientsList.join('|'), 'g'))?.forEach(ingredient => {
    harmIndication += commonHarmfullIngredientsIndication.get(ingredient)!
  })

  ingredients
    .split(' ')
    .filter(r => /[a-z]/.test(r)).forEach(item => {
      allIngredientsIndication += commonHarmfullIngredientsIndication.get(item) ?? 1
    })
  console.log(data)
  console.log(harmIndication)
  console.log(allIngredientsIndication)

  const harmfullIngredientAmount = harmIndication / allIngredientsIndication
  const result = harmfullIngredientAmount <= 0.33 ? 'Good' : harmfullIngredientAmount >= 0.66 ? 'Bad' : 'Neutral'

  return `Estimated harm on environment: ${harmfullIngredientAmount}% (${result})`
  // return data
}

type Scrape = {
  storeName: 'coop'
  barcode: string
}