'use client'

import CameraIcon from '@/public/components/CameraIcon'
import HamburgerMenu from '@/public/components/HamburgerMenu'
import natureBackground from '@/public/images/nature background.jpg'
import s from './page.module.scss'
import { Fragment, ReactElement, useRef, useState } from 'react'
import { products } from '@/constants/products'
import Scanner from './_scanner/Scanner'
import Image from 'next/image'

interface Product {
    name: string
    CO2e_kg: number
    impact_description: string
}

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navbarWrapperRef = useRef<HTMLDivElement>(null)
    const navbarRef = useRef<HTMLElement>(null)

    const navbarBtns: { img: ReactElement; func?: () => void }[] = [
        {
            img: <CameraIcon />,
            func: () => {
                navbarWrapperRef.current?.style.setProperty(
                    '--navbar-width',
                    `${navbarRef.current?.style.width}px`
                )
                navbarWrapperRef.current?.style.setProperty(
                    '--navbar-height',
                    `${navbarRef.current?.style.height}px`
                )
                setMenuOpen(!menuOpen)
            },
        },
        {
            img: <HamburgerMenu />,
        },
    ]

    return (
        <>
            <div
                ref={navbarWrapperRef}
                className={`${s.navbarWrapper} ${menuOpen ? s.menuOpen : ''}`}
            >
                <nav ref={navbarRef} className={s.navbar}>
                    {navbarBtns.map((btn, i) => (
                        <Fragment key={i}>
                            <button className={s.button} onClick={btn.func}>
                                {btn.img}
                            </button>
                            {i != navbarBtns.length - 1 && (
                                <div className={s.spacer} />
                            )}
                        </Fragment>
                    ))}
                </nav>
                <div className={s.navbarMenu}>
                    {menuOpen && <Scanner show={menuOpen} />}
                </div>
            </div>
            <div className={s.hero}>
                <div className={s.backgroundWrapper}>
                    <Image
                        src={natureBackground}
                        alt=''
                        className={s.background}
                    />
                </div>
                <h1 className={s.header}>EcoIndex</h1>
            </div>
            <main className={s.main}>
                {!menuOpen && (
                    <>
                        {products.map((product: Product, i) => (
                            <div key={i}>
                                <div className={s.title}>
                                    <p>{product.name}</p>
                                    <p>
                                        {product.CO2e_kg}kg CO<sub>2</sub>e/kg
                                    </p>
                                </div>
                                <p>{product.impact_description}</p>
                            </div>
                        ))}
                    </>
                )}
            </main>
        </>
    )
}
