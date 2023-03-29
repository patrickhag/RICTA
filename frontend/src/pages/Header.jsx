import React from 'react'
import rictaImg from '../assets/RICTA--IMG.png'

export default function header() {
    return (
        <div className="w3-top">
            <div className="w3-bar w3-white w3-padding w3-card" style={{ letterSpacing: '4px' }}>
                <a href="#home" className="w3-bar-item w3-button w3-hover-none"><img src={rictaImg} alt="" height="30" width="40" /></a>
                <div className="w3-right w3-hide-small">
                    <a href="#" className="w3-bar-item w3-button w3-hover-none">About</a>
                    <a href="#" className="w3-bar-item w3-button w3-hover-none">Contacts</a>
                </div>
            </div>
        </div>
    )
}
