import type { Metadata } from 'next'
import Image from 'next/image'
import natureBackground from '@/public/images/nature background.jpg'
import './globals.scss'

export const metadata: Metadata = {
    title: 'Ecoindex',
    description:
        'Scan the barcode of a product to see how harmful it is for the environment.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <div className='hero'>
                    <div className='backgroundWrapper'>
                        <Image
                            src={natureBackground}
                            alt='hero img'
                            className='background'
                        />
                    </div>
                    <h1 className='header'>EcoIndex</h1>
                </div>
                <main className='main'>{children}</main>
            </body>
        </html>
    )
}
