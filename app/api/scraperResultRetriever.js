'use server'

const { spawn } = require('child_process')

export default async function scraperResultRetriever(
    barcode1,
    action1,
    actionParams1
) {
    if (!barcode1) return 'barcode'

    const python = spawn('py', [
        'app/api/scraper/scraper.py',
        barcode1,
        action1,
        actionParams1,
    ])
    let dataToSend = ''

    for await (const data of python.stdout) {
        dataToSend += data
    }

    return dataToSend
}

// () => {
//     setTimeout(() => {
//         document.querySelector('.B6JQ8bRz.odcxhOBR.uQoAqqx6.n1yxWvZ1 > button').click();

//     }, 0)
//   }
