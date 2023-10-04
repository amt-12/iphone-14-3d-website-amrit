import React from 'react'
import Iphone from '../../assets/images/iphone-hand.png'
import HoldingIphone from '../../assets/images/iphone-hand.png'
const Jumbotron = () => {
    const handleLearnMore = () => {
        const element = document.querySelector('.sound-section')
        window.scrollTo({
            top: element.getBoundingClientRect().top,
            behavior: 'smooth',
            left: 0,
        })
    }
  return (
    <div className='jumbotron-section wrapper'>
        <h2 className='title'>New</h2>
        {/* <img className='logo' src={Iphone} alt="Iphone" /> */}
        <p className='text'>Big and bigger.</p>
        <span>
            <ul className='links'>
                <li>
                    <button className='button'>Buy</button>
                </li>
                <li>
                    <button className='button' onClick={handleLearnMore}>Learn more</button>
                </li>
            </ul>
            <img className='iphone-img' src={HoldingIphone} alt="iPhone" />
        </span>
      
    </div>
  )
}

export default Jumbotron
