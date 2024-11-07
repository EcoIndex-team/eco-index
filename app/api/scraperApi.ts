import scraperResultRetriever from "./scraperResultRetriever"

export default async function scraperApi(firstScrape: Scrape) {
  const data = await scraperResultRetriever(firstScrape.barcode, firstScrape.action, firstScrape.actionParams)

  return data
}

type Scrape = {
  barcode: string
  action: 'find' | 'search'
  actionParams: string
}