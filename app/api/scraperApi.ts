import scraperResultRetriever from "./scraperResultRetriever"

export default async function scraperApi(barcode: string, action: 'find' | 'search', actionParams: string) {
  const data = await scraperResultRetriever(barcode, action, actionParams)

  return data
}