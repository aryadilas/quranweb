import { Link }  from 'react-router-dom';

import ornament from '../../../assets/ornament.svg';

const SuratItem = ({surats}) => {
    
  return (
    <>
      {
        surats.map((surat) => {
          return(

            <Link className="gap-2 flex p-2 items-center w-full max-w-[10rem] justify-end rounded-md border border-black relative mb-2" to={`/surat/${surat.nomor}`} key={surat.nomor} >
              <div className="left-2 top-2 absolute mr-4 items-center w-12 h-12 text-sm bg-cover text-center flex justify-center" style={{ backgroundImage : `url(${ornament})` }}>
                <p className='absolute top-3 left-[0.9rem] min-w-[2ch] font-semibold'>{ surat['nomor'] }</p>
              </div>
              <div className="flex flex-col text-right">
                <p className="text-xl font-semibold font-arab">{ surat['nama'] }</p>
                <p className="text-sm">{ `${surat['namaLatin']} ` }</p>
                <p className="text-sm">{ `(${surat['arti']})` }</p>
                <p className="text-xs">{ ` ${surat['tempatTurun'] !== 'Mekah' ? 'Madaniyah' : 'Makkiyah'} . ${ surat['jumlahAyat'] } Ayat` }</p>        
              </div>        
            </Link>

          )
        })
      }
    </>
  )
}

export default SuratItem;