'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import s from './result.module.scss'
import itemResultConverter, {
    ScraperResponse,
} from '@/app/result/api/scraper/itemResultConverter'
import loadingImg from '@/public/images/xTg67EpLc-removebg-preview.png'

export default function Result() {
    const path = useParams<{ product: ['coop' | 'ica', string] }>()
    const [item, setItem] = useState<ScraperResponse>()
    const productRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function activateScanner() {
            const item = await itemResultConverter(
                path.product[0],
                path.product[1]
            )
            setItem(item)
        }
        activateScanner()
    }, [])

    return item ? (
        <div ref={productRef} className={s.product}>
            <Image width={100} height={100} src={item.img} alt='' />
            <div className={s.details}>
                <p className={s.name}>{item.name}</p>
                <p className={s.metadata}>
                    <span>{path.product[1]}</span>
                    <span>{item.brand}</span>
                </p>
                <p className={s.harm}>
                    CO<sub>2</sub>e<span data-score={item.harm} />
                </p>
            </div>
        </div>
    ) : (
        <div className={s.loading}>
            <Image width={200} src={loadingImg} alt='' />
            <p>
                Gathering information and calculating impact, this might take a
                few seconds...
            </p>
        </div>
    )
}
