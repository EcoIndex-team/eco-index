'use client'

import { useEffect } from 'react'
import styles from './Scanner.module.scss'

export default function Camera({ show }: { show: boolean }) {
	useEffect(() => {
		if (show) {
			openCamera()

			async function openCamera() {
				const vid = document.querySelector(`.${styles.video}`) as HTMLVideoElement

				await navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
					vid.srcObject = stream
					vid.onloadedmetadata = () => {
						vid.play()
					}
				})
			}
		}
	}, [show])

	return (
		<div className={styles.container}>
			<video className={styles.video} />
		</div>
	)
}
