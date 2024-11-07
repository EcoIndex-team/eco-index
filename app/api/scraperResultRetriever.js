'use server'

const { spawn } = require('child_process')

export default async function scraperResultRetriever(
    barcode1,
    action1,
    actionParams1,
    barcode2,
    action2,
    actionParams2
) {
    if (!barcode1) return 'barcode'

    const python = spawn('py', [
        'app/api/scraper/scraper.py',
        barcode1,
        action1,
        actionParams1,
        // barcode2,
        // action2,
        // actionParams2,
    ])
    let dataToSend = ''

    // python.stdout.on('readable', (data) => {
    // })
    for await (const data of python.stdout) {
        dataToSend += data
    }
    python.kill()

    return dataToSend
}
