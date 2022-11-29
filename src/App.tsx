import GlobalStyle from './styles/global'
import Header from './components/Header';
import Main from './components/InfoSector';
import CarouselContainer from './components/Carrousel/carrouselContainer';

function App() {
  return (
    <> 
      <GlobalStyle />
        <Header />
        <Main/>
        <CarouselContainer/>
    </>
  )
}

export default App;
