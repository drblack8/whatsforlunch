import React, { useState } from 'react'

const SearchBar = () => {
    const [input, setInput] = useState('')
    const [choices, setChoices] = useState([])

    const handleInput = async (e) => {
        setInput(e.target.value)
        setChoices([])
        const data = await fetch(`/api/users/search/${e.target.value}`)
        if (data.ok) {
            const userList = await data.json()
            setChoices(userList)
        }

    }

    return (
        <>
            <div className="search-component-container">
                <input type="search" onChange={handleInput} value={input} id="search" placeholder="Search" autoComplete="off"></input>
                <div className="search-bar-choices-container">
                    {choices.map(choice =>
                        <div className="searchbar-choice-div" key={choice}>
                            <a className="searchbar-choice-link" href={`/users/${choice}`}>{choice}</a>
                        </div>  
                    )}
                </div>
            </div>
        </>
    );

}

export default SearchBar