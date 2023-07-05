import React from 'react'
import "./Introduce.scss"
export default function Introduce() {
  return (
    <div className='introduce__container'>
        <div className='introduce__title'>
            <div className='introduce__infor'>
                <div className='introduce__infor__detail'>
                  <h3>OUR EL GAUCHO STEAKHOUSE – CONTEMPORARY AND SPECIALISED</h3>
                <p>El Gaucho is an upscale Argentina themed steakhouse restaurant chain, 
                  first established in 2011. As a privately owned and financially independent venture with today 
                  23 well-established locations in Europe and Asia, owner and management enjoy a great reputation 
                  with customers and partners and combine an extraordinary skill set in the industry and beyond.
                   With this well-proven and unique upscale business concept, the owner aims to drive expansion
                  in main European and Asian cities, operating 44 locations by the end of 2026. In addition,
                  we are launching for the first time franchise opportunities in the Gulf region, poised to
                   take our successful brand to new heights.</p>  
                </div>
            </div>
            <div className='introduce__img'>
                <img src='../images/background_img/bg2.png'></img>
            </div>
        </div>
    </div>
  )
}
