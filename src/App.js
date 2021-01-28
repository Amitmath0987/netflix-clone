import "./App.css";
import Row from "./Components/Row";
import request from "./request";
import Banner from "./Components/Banner/Banner.js";
import NavBar from "./Components/NavBar/NavBar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Row
        title={"Netflix Originals"}
        fetchUrl={request.fetchNetflixOriginals}
        isLargerRow
      />
      <Row title={"Top Trending"} fetchUrl={request.fetchTrending} />
      <Row title={"Top Rated"} fetchUrl={request.fetchTopRated} />
      <Row title={"Action Movies"} fetchUrl={request.fetchActionMovies} />
      <Row title={"Comedy Movies"} fetchUrl={request.fetchComedyMovies} />
      <Row title={"Horror Movies"} fetchUrl={request.fetchHorrorMovies} />
      <Row title={"Romance Movies"} fetchUrl={request.fetchRomanceMovies} />
      <Row title={"Documentaries"} fetchUrl={request.fecthDocumentries} />
    </div>
  );
}

export default App;
