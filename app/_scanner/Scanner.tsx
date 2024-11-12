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
                        async (text, result) => {
                            html5QrCode.stop()
                            // const a = await scraperApi({
                            //     barcode: `https://www.coop-cdn.se/sustainabilityv2/?barcode=${parseInt(
                            //         text
                            //     )}&amp;mode=desktop`,
                            //     action: 'find',
                            //     // actionParams:
                            //     //     'div#OverviewGrid img:not(img[alt=""])',
                            //     actionParams: '.u-marginBmd',
                            // })

                            // console.log(a)
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
        const a = await scraperApi({
            storeName: 'coop',
            // barcode: `7300156486318`,
            barcode: `4011800568511`,
            // action: 'find',
            // actionParams:
            //     'div#OverviewGrid img:not(img[alt=""])',
            // actionParams: 'button.u-marginBmd',
        })

        console.log(a)
        // const a = await scraperApi(
        //     {
        //         barcode: `https://www.coop-cdn.se/sustainabilityv2/?barcode=${7300156486318}&amp;mode=desktop`,
        //         action: 'find',
        //         actionParams: 'div#OverviewGrid img:not(img[alt=""])',
        //     }
        //     // {
        //     //     barcode: `https://www.coop.se/handla/varor/`,
        //     //     action: 'search',
        //     //     actionParams: 'Jfr-pris: {}/lit',
        //     // }
        //     // {
        //     //     barcode: `https://www.coop.se/handla/varor/`,
        //     //     action: 'find',
        //     //     // actionParams: '.mpl9oZN6.rnLahZtT',
        //     //     actionParams: 'button',
        //     //     // actionParams:
        //     //     //     'div[data-product-information="Produktfakta"] > div > button.a9ShLV3j',
        //     // }
        // )
        // console.log('a', a)
        // console.log('a', a)
        // console.log(`https://www.coop.se/handla/varor/${a}`)
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
