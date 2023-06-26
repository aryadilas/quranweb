import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import ornament from '../../../assets/ornament.svg';

const SuratDetail = () => {
    
    const { nomor } = useParams(); 
    const [ ayats , setAyats ] = useState([]);
    const [ isLoad , setIsLoad ] = useState(false);
    const [ bookmark , setBookmark ] = useState( JSON.parse(localStorage.getItem("bookmark")) || []);

    //Event untuk menghandle menambah dan menghapus bookmark
    const book = (nomorSurat, namaSurat, nomorAyat) => () => {
        if ( JSON.stringify(bookmark) === JSON.stringify([{nomorSurat : nomorSurat, namaSurat : namaSurat, nomorAyat : nomorAyat}]) ) {
            setBookmark([]);
        } else {
            setBookmark([{nomorSurat : nomorSurat, namaSurat : namaSurat, nomorAyat : nomorAyat}]);
        }
    }
    localStorage.setItem('bookmark', JSON.stringify(bookmark), [bookmark]);

    //Event untuk menghadle pemutaran audio
    const audioRefs = useRef({});
    const playAudio = (audioId) => () => {
        const audioElement = audioRefs.current[audioId];

        if (audioElement) {
            audioElement.play();

            audioElement.addEventListener('ended', () => {
                console.log('stop');
            });

            console.log('played');
        }
    };

    //Component Loading
    const Loading = () => (
        <div className="bg-white w-full h-full min-h-screen flex justify-center items-center">
            <h1 className="text-2xl animate-pulse font-semibold">Loading</h1>
            <h1 className="text-2xl animate-spin font-semibold">+</h1>
        </div>
    );

    //Mengambil data dari API menggunakan useEffect
    useEffect( ()=>{
        async function fetchData(){
        
            const endpoint = `https://equran.id/api/v2/surat/${nomor}`;
            let response = await fetch(endpoint);
            let { data } = await response.json();

            setAyats(data);
            setIsLoad(true); 

      }
      fetchData();
    }, [nomor]);

    //Event untuk smooth scroll ke bookmark
    const scrollTo = () => {
        let element = document.getElementById('book');

        if (element) {
            element.scrollIntoView({  
                behavior: 'smooth' ,
                block: 'center',
                inline: 'center'
            });
        }
    }
    

    
          
    //Trigger event scrollTo jika element telah di Load dan mengubah title halaman
    useEffect( () => {
        document.title = `Quranweb | Surat ${ayats['namaLatin']}`;
        if (isLoad) {
            scrollTo();
        } 
        
    } );

    const bookmarkData = localStorage.getItem("bookmark");
    const suratBookmark = bookmarkData !== "[]" ? JSON.parse(bookmarkData)[0].nomorSurat : null;
    const ayatBookmark = bookmarkData !== "[]" ? JSON.parse(bookmarkData)[0].nomorAyat : null;
    
    // if (isLoad) {
        return(
            <>
                
                {isLoad ? (
                    <>
                        <div className='w-full sticky bg-white z-10 shadow text-[#4632b8] px-9 flex justify-center gap-4 top-0 p-1'>
                            <Link className="cursor-pointer hover:font-semibold w-fit p-1 group   flex items-center gap-2" to={`/`}>
                                <p className="text-sm">Home</p>
                            </Link>
                            {ayats['suratSebelumnya'] && (
                                <Link className="cursor-pointer hover:font-semibold w-fit p-1 group   flex items-center gap-2" to={`/surat/${ayats['suratSebelumnya']['nomor']}`}>
                                    <p className="text-sm">{`Prev : ${ayats['suratSebelumnya']['namaLatin']}`}</p>
                                </Link>
                            )}
                            {ayats['suratSelanjutnya'] && (
                                <Link className="cursor-pointer hover:font-semibold w-fit p-1 group   flex items-center gap-2" to={`/surat/${ayats['suratSelanjutnya']['nomor']}`}>
                                    <p className="text-sm">{`Next : ${ayats['suratSelanjutnya']['namaLatin']}`}</p>
                                </Link>
                            )}
                        </div>
                
                        <main className="w-full p-9 min-h-[90dvh]">    
                            
                            <div className="gap-2 flex pb-4 items-center w-full justify-end rounded mx-auto  relative mb-2">
                                <div className="flex flex-col sm:flex-row-reverse gap-4 text-right">
                                    <div className='mx-auto flex flex-col justify-center text-center'>
                                        <p className="text-5xl font-semibold font-arab text-center">{ ayats['nama'] }</p>
                                        <p className="text-sm">{ `${ayats['namaLatin']}` }</p>
                                        <p className="text-sm">{ `(${ayats['arti']})` }</p>
                                    </div>
                                    <p className="text-justify text-sm sm:columns-3 md:columns-4 first-letter:font-semibold first-letter:text-5xl first-letter:mr-1  first-letter:float-left gap-5 mt-2" dangerouslySetInnerHTML={{ __html: ayats['deskripsi']  }}></p>
                                </div>         
                            </div>
                            
                            
                            <div className='flex flex-wrap  flex-row-reverse gap-4'>
                            {ayats['ayat'].map( (ayat) => {
                                // Memeriksa bookmark
                                const bookmarked = (suratBookmark === nomor && ayatBookmark === ayat['nomorAyat']) 
                                        
                                return(
                                    <div id={ `${ bookmarked ? "book" : ""}` } className={ `${ bookmarked ? "border-[#4632b8] shadow-lg ring-4" : "border-black" } flex-shrink flex-grow  gap-2 flex flex-col p-5  relative rounded-md border mb-2`} key={ayat['nomorAyat']}>
                                        <div className='w-full flex flex-col justify-between h-full'>
                                            <div className="left-5 top-5 absolute mr-4 items-center w-12 h-12 text-sm bg-cover text-center flex justify-center" style={{ backgroundImage : `url(${ornament})` }}>
                                                <p className='absolute top-3 left-[0.9rem] min-w-[2ch] font-semibold'>{ ayat['nomorAyat'] }</p>
                                            </div>

                                            <div className="flex  justify-end mb-2">
                                                <p className="break-words max-w-[30ch] ml-14 text-3xl sm:text-4xl text-right font-arab" >{ ayat['teksArab'] }</p>
                                            </div>
                            
                                            <div className="flex justify-between w-fit max-w-[75ch] items-center mb-2 ">
                                                <p className='break-words  text-justify'>
                                                <span className='italic'> { ayat['teksLatin'] }</span><br />
                                                <span> { ayat['teksIndonesia'] }</span>
                                                </p>
                                            </div>
                            
                                            <div className='flex justify-end gap-2 '>
                                                <audio ref={(el) => (audioRefs.current[`audio-${ayat['nomorAyat']}`] = el)} id={`audio-${ayat['nomorAyat']}`}>
                                                    <source src={ ayat['audio']['05'] } type="audio/mp3" />
                                                </audio>
                                                <button onClick={playAudio(`audio-${ayat['nomorAyat']}`)} className="bg-[#4632b8] hover:text-white w-fit px-2 py-1 group text-slate-200 rounded-lg flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className='fill-slate-200 group-hover:fill-white'><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>
                                                    <p className="text-sm">Play</p>
                                                </button>
                                                <button onClick={book(nomor,  ayats['namaLatin'], ayat['nomorAyat'])} className="bg-[#4632b8] hover:text-white w-fit px-2 py-1 group text-slate-200 rounded-lg flex items-center gap-2">
                                                    { bookmarked ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" className='fill-slate-200 group-hover:fill-white'><path d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"></path></svg>
                                                    ) :  (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className='fill-slate-200 group-hover:fill-white'><path d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"></path></svg>
                                                    )}
                                                    <p className="text-sm">Bookmark</p>
                                                </button>

                                            </div>
                                        </div>
                                    </div>	                    
                                )  
                                
                            })}</div> 
                        </main>
                    </>                
                ) : <Loading />}
            
                
            </>
        )
//    }
        
}

export default SuratDetail;