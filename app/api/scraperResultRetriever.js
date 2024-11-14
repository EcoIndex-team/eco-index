'use server'

import { spawn } from 'child_process'

export default async function scraperResultRetriever(storeName, barcode) {
    if (!barcode) return 'barcode'

    const python = spawn('py', [
        'app/api/scraper/scraper.py',
        storeName,
        barcode,
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
