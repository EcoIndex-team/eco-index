import scraperResultRetriever from "./scraperResultRetriever"

const levelsOfHarm = new Map([
  ['lxg risk', 1],
  ['relativt lxg', 2],
  ['medelhxg risk', 3],
  ['relativt hxg risk', 4],
  ['mycket hxg risk', 5],
])

export default async function scraperApi(firstScrape: Scrape) {
  const data = await scraperResultRetriever(firstScrape.barcode, firstScrape.action, firstScrape.actionParams)
  const dataArray = data.split('>\r\n<')
  let harmIndication = 0

  // if (data === '') {
  //   return 'Could not find any statistics for this item'
  // }

  // dataArray.forEach((statistic, i, arr) => {
  //   const formattedStatistic = statistic.replace('�', 'x')

  //   harmIndication += levelsOfHarm.get(formattedStatistic.split('\'')[3])!
  // })

  // const result = 30 - harmIndication < 10 ? 'Good' : 30 - harmIndication > 20 ? 'Bad' : 'Neutral'

  // return `Estimated harm on environment: ${harmIndication} (${result})`
  return data
}

type Scrape = {
  barcode: string
  action: 'find' | 'search'
  actionParams: string
}