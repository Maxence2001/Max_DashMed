import React, { useState} from 'react';

import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from "./components/SearchResultsList";

function Header({ OpenSidebar }) {
    // State pour gérer les résultats de la recherche
    const [results, setResults] = useState([]);


    

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
            <div className='header-left'>
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && <SearchResultsList results={results} />}
            </div>
            <div className='header-right'>
                <BsFillBellFill className='icon' />
                <BsFillEnvelopeFill className='icon' />
                <BsPersonCircle className='icon' />
            </div>
        </header>
    );
}

export default Header;
