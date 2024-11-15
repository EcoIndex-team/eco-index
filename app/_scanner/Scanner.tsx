'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Scanner.module.scss'
import { Html5Qrcode } from 'html5-qrcode'
import scraperApi from '../api/scraperApi'
// import { useScanner } from '@/hooks/useScanner'
import { useRouter } from 'next/navigation'

export default function Scanner({ show, width, height }: ScannerProps) {
    // const [stream, setStream] = useState<boolean>(false)
    const router = useRouter()
    // const { scrape } = useScanner()
    const divRef = useRef<HTMLDivElement>(null)
    let cameraActivated = false

    useEffect(() => {
        if (show && cameraActivated === false) {
            cameraActivated = true
            ;(async () => {
                try {
                    // const allowed = await navigator.mediaDevices
                    //     .getUserMedia({ video: true })
                    //     .then(() => (cameraActivated = true))

                    const cameraId = await Html5Qrcode.getCameras()
                    const html5QrCode = new Html5Qrcode('reader', {
                        verbose: false,
                    })

                    const onSuccess = (barcode: string) => {
                        html5QrCode.stop()
                        // await scrape({ barcode: barcode, storeName: 'ica' })
                        router.push(`/result/ica/${barcode}/`)
                    }

                    const onFailure = (error: string) => {
                        alert(error)
                    }

                    const scannerConfig = {
                        fps: 10,
                        qrbox: {
                            width: width ?? 250,
                            height: height ?? 200,
                        },
                    }

                    if (
                        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                            navigator.userAgent
                        )
                    ) {
                        html5QrCode.start(
                            { facingMode: 'environment' },
                            scannerConfig,
                            onSuccess,
                            onFailure
                        )
                    } else {
                        html5QrCode.start(
                            cameraId[0].id,
                            scannerConfig,
                            onSuccess,
                            onFailure
                        )
                    }
                } catch (error) {
                    console.log(
                        `The scanner did not respond due to the following error: ${error}`
                    )
                    // setStream(false)
                }
            })()
        }
    }, [show])

    // async function g() {
    //     const a = await scraperApi({
    //         storeName: 'ica',
    //         // barcode: `4011800569518`,
    //         barcode: `4011800569518`,
    //     })

    //     console.log(a)
    // }

    // g()

    return (
        <div className={styles.container}>
            <div id='reader' ref={divRef} className={styles.video} />
        </div>
    )
}

type ScannerProps = {
    show: boolean
    width?: number
    height?: number
}
