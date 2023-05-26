import {useEffect, useState} from 'react';
import { Link }  from 'react-router-dom';

import searchIcon from '../../../assets/bx-search-alt.svg';

import SuratItem from '../SuratItem/SuratItem';

const Search = () => {
    
    const [ surats , setSurats] = useState([]);
    const [ searchResults , setSearchResults] = useState([]);

    //Menggunakan useEffect untuk fetch data surat dari API
    useEffect( ()=>{
        async function fetchData(){
          let response = await fetch('https://equran.id/api/v2/surat');
          let { data } = await response.json();
          setSurats(data);
          setSearchResults(data);
        }
        fetchData();    
    }, []);

    //Event untuk menghandle pencarian
    const handleSearch = (e) => {
        const searchText = e.target.value;
        const results = surats.filter(
            (surat) => {
                let jenis = surat.tempatTurun.toLowerCase() === 'mekah' ? 'makkiyah' : 'madaniyah';
                return surat.namaLatin.toLowerCase().includes(searchText.toLowerCase()) ||
                surat.tempatTurun.toLowerCase().includes(searchText.toLowerCase()) ||
                jenis.toLowerCase().includes(searchText.toLowerCase()) ||
                surat.arti.toLowerCase().includes(searchText.toLowerCase())
            }
        );
        setSearchResults(results);
    };

    //Mengambil data bookmark dari localStorage
    const bookmarkData = localStorage.getItem("bookmark");
    let suratBookmark = null;
    let namaSuratBookmark = null;
    let ayatBookmark = null;
    if (bookmarkData !== null && bookmarkData !== "[]") {
        const parsedBookmark = JSON.parse(bookmarkData);
        if (parsedBookmark.length > 0) {
            suratBookmark = parsedBookmark[0].nomorSurat;
            namaSuratBookmark = parsedBookmark[0].namaSurat;
            ayatBookmark = parsedBookmark[0].nomorAyat;
        }
    }
    
    return ( 
        <div className='w-full flex flex-wrap gap-4 justify-center mx-auto'>
            
            {/* Memeriksa Jika ada bookmark maka tampilkan Link ke bookmark tersebut */}
            {
                suratBookmark &&
                (<div className="w-full p-2">
                    <Link to={`/surat/${suratBookmark}`} key={1} >
                        <p className='text-center text-[#4632b8] underline'>{`Tersimpan Surat ${namaSuratBookmark} Ayat ${ayatBookmark}, Klik untuk melanjutkan`}</p>
                    </Link>
                </div>)
            }

            {/* Input form untuk melakukan pencarian */}
            <div className="w-full p-2">
                <div className="border border-black max-w-sm p-2 gap-2 bg-white rounded-md mx-auto flex">
                    <div className=" bg-contain bg-no-repeat w-6" style={{ backgroundImage : `url(${searchIcon})` }}></div>
                    <input className="flex-grow outline-none" 
                    type="text" 
                    placeholder="Cari Sesuatu..."
                    onChange={handleSearch} />
                </div>
            </div>

            {/* Menampilkan daftar surat */}
            <SuratItem surats={searchResults} />

        </div>
    );
}

export default Search;