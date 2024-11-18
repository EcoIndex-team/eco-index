'use server'

import child_process from 'child_process'
import util from 'node:util'

export default async function scraperResultRetriever(storeName, barcode) {
    // const MAXIMUM_ALLOWED_RESPONSE_TIME = 10000

    // const python = spawn(
    //     'python',
    //     ['server/scraper/scraper.py', storeName, barcode],
    //     { shell: true }
    // )
    let dataToSend = ''
    const exec = util.promisify(child_process.exec)

    const { stdout } = await exec(
        `python server/scraper/scraper.py ${storeName} ${barcode}`,
        { shell: 'WindowsPowerShell' }
        // (error, out) => {
        //     if (error) {
        //         console.error('exec error: ', error)
        //     }

        //     // console.log(out)
        //     dataToSend += out
        //     // console.log(dataToSend)
        //     // return dataToSend
        // }
    )

    // console.log(stdout)

    // console.log('test', dataToSend)

    // const dataToSend = python.stdout.read()
    // python.stdout.on('readable', (data) => {
    //     dataToSend += data
    //     console.log(data)
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

    // for await (const data of python.stdout) {
    //     dataToSend += data
    // }

    return stdout
}

// () => {
//     setTimeout(() => {
//         document.querySelector('.B6JQ8bRz.odcxhOBR.uQoAqqx6.n1yxWvZ1 > button').click();

//     }, 0)
//   }
