'use client'

import CameraIcon from '@/public/components/CameraIcon'
import HamburgerMenu from '@/public/components/HamburgerMenu'
import natureBackground from '@/public/images/nature background.jpg'
import './App.scss'
import { useState } from 'react'
// import { products } from './products'
import Camera from './_scanner/Scanner'

interface Product {
	name: string
	CO2e_kg: number
	impact_description: string
}

function App() {
	const [menuOpen, setMenuOpen] = useState(false)

	// useEffect(() => {

	// })

	// const root = document.querySelector(':root')

	return (
		<>
			<div className={`navbar-wrapper ${menuOpen ? 'menu-open' : ''}`}>
				<nav className='navbar'>
					{[
						<button
							className='button'
							onClick={() => {
								const navbarWrapper = document.querySelector('.navbar-wrapper') as HTMLDivElement
								const navbarRect = (
									document.querySelector('.navbar') as HTMLElement
								).getBoundingClientRect()
								navbarWrapper.style.setProperty('--navbar-width', `${navbarRect.width}px`)
								navbarWrapper.style.setProperty('--navbar-height', `${navbarRect.height}px`)
								setMenuOpen(!menuOpen)
							}}>
							<CameraIcon />
						</button>,
						<button className='button'>
							<HamburgerMenu />
						</button>,
					].map((item, index, array) => [
						item,
						index != array.length - 1 && <div className='spacer'></div>,
					])}
				</nav>
				<div className='navbar-menu'>{menuOpen && <Camera show={menuOpen} />}</div>
			</div>
			<div className='hero'>
				<div className='background-wrapper'>
					<img
						src={natureBackground}
						className='background'
					/>
				</div>
				<h1 className='header'>EcoIndex</h1>
			</div>
			<main className='main'>
				{/* {products.map((product: Product, i) => (
					<div key={i}>
						<div className='title'>
							<p>{product.name}</p>
							<p>
								{product.CO2e_kg}kg CO<sub>2</sub>e/kg
							</p>
						</div>
						<p>{product.impact_description}</p>
					</div>
				))} */}
			</main>
		</>
	)
}
