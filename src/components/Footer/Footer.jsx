import React from 'react'
import './Footer.scss'
export default function Footer() {
  return (
    <div className='footer__container'>
        <div className='footer__one'>
            <div className="footer__item">
                <h6>LOCATION</h6>
                <ul>
                    <li>Binh Duong</li>
                    <li>Da Nang</li>
                    <li>Ha Noi</li>
                    <li>HCM</li>
                </ul>
            </div>
            <div className="footer__item">
                <h6>COMPANY</h6>
                <ul>
                    <li>About</li>
                    <li>Career</li>
                </ul>
            </div>
            <div className="footer__item">
                <h6>CONTACT</h6>
                <ul>
                    <li>Get in Touch</li>
                    <li>FAQs</li>
                </ul>
            </div>
            <div className="footer__item">
                <h6>LEGAL</h6>
                <ul>
                    <li>Privacy & Cookie Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>
            <div className="footer__item">
                <h6>VISIT EL GAUCHO</h6>
                <ul>
                    <li>Viet nam</li>
                    <li>Thailand</li>
                    <li>Philippines</li>
                </ul>
            </div>
        </div>
        <div className='footer__two'>
            <div className='footer__logo'>
                <img src='../images/logo/logo.svg'></img>
               
            </div>
            <div className='footer__infor'>
                <div className='footer__infor__des'>
                    <p>EL GAUCHO THE PLACE FOR STEAK</p>
                    <p>El Gaucho Argentinian Steakhouse is an established restaurant group currently operating 23 venues 
                        in Vietnam, Thailand, the Philippines, Slovakia, and Czech Republic.</p>
                </div>
                <div className='footer__infor__contact'>
                    Follow us:<i class="fa-brands fa-facebook"></i> <i class="fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
    </div>
  )
}
