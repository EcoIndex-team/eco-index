'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Scanner.module.scss'
import {
    Html5Qrcode,
    Html5QrcodeScanner,
    Html5QrcodeSupportedFormats,
} from 'html5-qrcode'
import scraperApi from '../api/scraperApi'

export default function Scanner({ show, width, height }: ScannerProps) {
    const [stream, setStream] = useState<boolean>(false)
    const divRef = useRef<HTMLDivElement>(null)
    let cameraActivated = false

    useEffect(() => {
        if (show && cameraActivated === false) {
            cameraActivated = true
            ;(async () => {
                try {
                    const allowed = await navigator.mediaDevices
                        .getUserMedia({ video: true })
                        .then(() => (cameraActivated = true))

                    const cameraId = await Html5Qrcode.getCameras()
                    const html5QrCode = new Html5Qrcode('reader', {
                        verbose: false,
                    })
                    html5QrCode.start(
                        cameraId[0].id,
                        {
                            fps: 10,
                            qrbox: {
                                width: width ?? 250,
                                height: height ?? 200,
                            },
                        },
                        (text, result) => {
                            console.log(text, result)
                            html5QrCode.stop()
                        },
                        (error) => {
                            console.log(error)
                        }
                    )
                } catch (error) {
                    console.log(
                        `The scanner did not respond due to the following error: ${error}`
                    )
                    setStream(false)
                }
            })()
        }
    }, [show])

    async function g() {
        let a = ''
        await scraperApi(
            `https://www.coop.se/handla/sok/?q=${7300156486318}`,
            'search',
            'href="/handla/varor/{}"'
        ).then((result) => (a = result))
        // console.log('a', a)
        // console.log(`https://www.coop.se/handla/varor/${a}`)
        console.log('a', a)
        const b = await scraperApi(
            `https://www.coop.se/handla/varor/${a}`,
            'search',
            'INGREDIENSER: {}'
        )
        console.log('b', b)
        // console.log('b', b, 'a', a)
        // 'href="/handla/varor/{}"'
        // https://www.coop.se/handla/sok/?q=
        // const response = await fetch('../api/api', {
        //     method: 'GET',
        //     body: reader()
        // })
        // const data = response.json()
        // console.log(data)
        // console.log(b)
    }

    g()

    return (
        <div className={styles.container}>
            <div id='reader' ref={divRef} className={styles.video} />
            {/* <div id='reader' ref={divRef}></div> */}
        </div>
    )
}

type ScannerProps = {
    show: boolean
    width?: number
    height?: number
}
