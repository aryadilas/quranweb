// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import Surat from './Component/Home/Surat/Surat';
import SuratDetail from './Component/SuratDetail/SuratDetail/SuratDetail';

const Home = () => {
  return (
    <>
      <Header />
      <Surat />
      <Footer />
    </>
  );
}

const Ayat = () => {
  return (
    <>
      <SuratDetail />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/surat/:nomor" element={ <Ayat /> } />
      </Routes>
    
      
    </>
  );
}

export default App;























