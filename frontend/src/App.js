import MyNavbar from "./components/navbar"
import Home from "./views/home"
import Movie from "./views/movie"
import Carrito from "./views/carrito"

import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import MyContext from "./MyContext"

function App() {
  const [movies, setMovies] = useState([])
  const [price, setPrice] = useState(0)
  const [carrito, setCarrito] = useState([])
  const [cantidad, setCantidad] = useState(0) 

  useEffect(() => {
    getDataMovies()
  }, [])

  const getDataMovies = async () => {
    const resDataMovies = await fetch("/movies.json")
    const dataMovies = await resDataMovies.json()
    setMovies(dataMovies)
  }

  useEffect(() => {
    let precioTotal = 0
    let cantidadTotal = 0
    carrito.forEach(function (movie) {
      precioTotal += movie.price * movie.cantidad
      cantidadTotal += movie.cantidad
      setPrice(precioTotal)
      setCantidad(cantidadTotal)
    })
  }, [carrito])

  const movieAdd = (element) => {
    const movieCarrito = {
      id: element.id,
      img: element.img,
      name: element.name,
      price: element.price,
      cantidad: 1,
    }
    const addedMovie = carrito.find((e) => e.id === element.id)
    if (addedMovie) {
      addedMovie.cantidad += 1
      setCarrito([...carrito])
    } else setCarrito([...carrito, movieCarrito])
  }

  const movieRemove = (element, index) => {
    const removedMovie = carrito.find((e) => e.id === element.id)
    if (removedMovie.cantidad > 0) {
      removedMovie.cantidad -= 1
      setCarrito([...carrito])
    } else {
      carrito.splice(index, 1)
      setCarrito([...carrito])
    }
  }

  const sharedStates = {
    movies,
    setMovies,
    price,
    setPrice,
    carrito,
    setCarrito,
    cantidad,
    setCantidad,
    movieAdd,
    movieRemove
  }

  return (
    <div>
      <MyContext.Provider value={sharedStates}>
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:selectedMovie" element={<Movie />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
