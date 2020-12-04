import React, { useState } from 'react'

const Footer = () => {
    const [currentPage, setCurrentPage] = useState(null)

    return (
        <div>
            <div>
                <p>This homage to instagram was created by:</p>
            </div>
            <div>
                <p>Daniel Black</p>
            </div>
            <div>
                <p>Andrea Jackson</p>
            </div>
            <div>
                <p>Jaron Degen</p>
            </div>
            <div>
                <p>Quincy Jones</p>
            </div>
        </div>
    )
}

export default Footer;