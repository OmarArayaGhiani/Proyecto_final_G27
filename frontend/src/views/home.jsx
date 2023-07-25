import "../css/css-views/home.css"

import MyCard from "../components/card"

import { useContext } from "react"
import MyContext from "../MyContext"
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const Home = () => {
  let { movies, setMovies } = useContext(MyContext)
  const selectGenre = (id) => {
    setMovies((movies) =>
      movies.map((item) => {
        if (item.id === id) {
          return { ...item, active: !item.active };
        }
        return item;
      })
    );
  }

  return (
    <>
      <div className="d-block d-xl-flex mx-5">
        <div>
          <div className="d-flex d-xl-none justify-content-evenly">
            <p className="fw-bold fs-4 me-4">Categorías</p>
            <select>
              {movies.map((element, index) => {
                return (
                  <option key={index} className="mb-1" value={element.genre}>
                    {element.genre}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="d-none d-xl-block mx-2 col-2">
          <p className="fw-bold fs-4 mt-3 my-3">Categorías</p>
          <hr />
          <div>
            <ListGroup>
              {movies.map((element, index) => {
                return (
                  <ListGroup.Item key={index} onClick={() => selectGenre(element.id)} active={element.active} variant="secondary">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold d-flex justify-content-between">
                        <span>{element.genre}</span>
                        <Badge bg="primary" pill>
                          1
                        </Badge>
                      </div>

                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </div>
        </div>
        <MyCard />
      </div>
    </>
  )
}

export default Home
