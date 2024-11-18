'use server'

import { spawn } from 'child_process'

export default async function scraperResultRetriever(storeName, barcode) {
    // const MAXIMUM_ALLOWED_RESPONSE_TIME = 10000

    const python = spawn(
        'python',
        ['server/scraper/scraper.py', storeName, barcode],
        { shell: true }
    )

    let dataToSend = ''
    // python.stdout.on('data', (data) => {
    //     dataToSend += data
    // })
    // const python = spawn('py', [
    //     'app/api/scraper/scraper.py',
    //     storeName,
    //     barcode,
    // ])

    // setTimeout(() => {
    //     if (!(dataToSend.length > 0)) {
    //         python.kill()
    //         return 'fail'
    //     }
    // }, MAXIMUM_ALLOWED_RESPONSE_TIME)

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
