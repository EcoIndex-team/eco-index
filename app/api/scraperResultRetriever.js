'use server'

const { spawn } = require('child_process')

export default async function scraperResultRetriever(
    barcode,
    action,
    actionParams
) {
    if (!barcode) return 'barcode'

    const python = spawn('py', [
        'app/api/scraper/scraper.py',
        barcode,
        action,
        actionParams,
    ])
    let dataToSend = ''
    barcode = ''
    action = ''
    actionParams = ''

    for await (const data of python.stdout) {
        dataToSend += data
    }

    return dataToSend
}
