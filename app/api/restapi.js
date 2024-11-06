'use server'

const { spawn } = require('child_process')

export default async function reader() {
    const python = spawn('py', ['app/api/scraper/scraper.py'])
    let dataToSend = ''

    for await (const data of python.stdout) {
        dataToSend += data
    }

    return dataToSend
}
