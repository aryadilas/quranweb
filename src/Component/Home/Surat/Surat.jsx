import { useEffect } from "react";
import Search from '../Search/Search';



const Surat = () => {

  //Mengubah title halaman
  useEffect( () => {
    document.title = `Alquran Digital Lengkap Dengan Terjemahan Bahasa Indonesia`;
  } );

  return (
    <main className="w-full min-h-screen">
      <Search />
    </main>
  );
}

export default Surat;