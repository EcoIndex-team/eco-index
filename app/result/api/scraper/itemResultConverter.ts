const commonHarmfullIngredientsIndication = new Map([
  ['palmolja', 4], ['socker', 2], ['glukosfruktossirap', 2], ['glukossirap', 2], ['sockersirap', 2],
  ['vete', 1], ['havre', 1], ['rxg', 1], ['korn', 1], ['ris', 1], ['majs', 1], ['rapsolja', 2], ['mjxlk', 2], ['kakao', 2]
])

const commonHarmfullIngredientsList = [
  'palmolja', 'socker', 'glukosfruktossirap', 'glukossirap', 'sockersirap',
  'vete', 'havre', 'rxg', 'korn', 'ris', 'majs', 'rapsolja', 'mjxlk', 'kakao'
]

export default async function itemResultConverter(storeName: StoreName | string, barcode: string) {
  const productResult = await fetch(`/result/api/${storeName}_${barcode}/`)
  const response = await productResult.json()
  const productInfo: Data = JSON.parse(response)
  const ingredients =
    productInfo.ingredients.replaceAll('�', 'x')
      .toLowerCase()
      .replace('ingredienser: ', '')
      .split('kan innehxlla')[0]

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

  const harmfullIngredientAmount = harmIndication / allIngredientsIndication
  const result = harmfullIngredientAmount <= 0.33 ? 'low' : harmfullIngredientAmount >= 0.66 ? 'high' : 'medium'

  return {
    harm: result,
    brand: productInfo.brand,
    name: productInfo.name,
    img: productInfo.img
  }
}

type StoreName = {
  storeName: 'coop' | 'ica'
}

type Data = {
  name: string,
  img: string,
  brand: string,
  ingredients: string
}

export type ScraperResponse = {
  harm: string
  brand: string
  name: string
  img: string
}