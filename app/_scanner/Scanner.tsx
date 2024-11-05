'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Scanner.module.scss'
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'

export default function Camera({ show }: { show: boolean }) {
    const [stream, setStream] = useState<boolean>(false)
    let cameraActivated = false

    useEffect(() => {
        if (show && cameraActivated === false) {
            // cameraActivated = true
            ;(async () => {
                try {
                    const allowed = await navigator.mediaDevices
                        .getUserMedia({ video: true })
                        .then(() => (cameraActivated = true))

                    function onScanSuccess(
                        decodedText: any,
                        decodedResult: any
                    ) {
                        // handle the scanned code as you like, for example:
                        console.log('works')
                        console.log(
                            `Code matched = ${decodedText}`,
                            decodedResult
                        )
                    }
                    function onScanFailure(error: any) {
                        // handle scan failure, usually better to ignore and keep scanning.
                        // for example:
                        console.warn(`Code scan error = ${error}`)
                    }
                    let html5QrcodeScanner = new Html5QrcodeScanner(
                        'reader',
                        {
                            fps: 10,
                            qrbox: { width: 250, height: 250 },
                            formatsToSupport: [0, 9],
                        },
                        false
                    )
                    // Html5QrcodeSupportedFormats.QR_CODE
                    html5QrcodeScanner.render(onScanSuccess, onScanFailure)
                    cameraActivated = true
                } catch (error) {
                    console.log(
                        `The scanner did not respond due to the following error: ${error}`
                    )
                    setStream(false)
                }
            })()
        }
    }, [show])

    return (
        <div className={styles.container}>
            <div id='reader' className={styles.video} />
            {/* <div id='reader' ref={divRef}></div> */}
        </div>
    )
}
