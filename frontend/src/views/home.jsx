import "../css/css-views/home.css"

import MyCard from "../components/card"

import {useContext} from "react"
import MyContext from "../MyContext"

const Home = () => {
  const {movies} = useContext(MyContext)
  return (
    <>
      <div className="d-block d-xl-flex mx-5">
        <div>
          <div className="d-flex d-xl-none justify-content-evenly">
            <p className="fw-bold fs-4 me-4">Categorías</p>
            <select>
              {movies.map((element) => {
                return (
                  <option className="mb-1" value={element.genre}>
                    {element.genre}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="d-none d-xl-block mx-2">
          <p className="fw-bold fs-4 mt-5 my-3">Categorías</p>
          <hr />
          <div>
            {movies.map((element) => {
              return (
                <p className="mb-1" value={element.genre}>
                  {element.genre}
                </p>
              )
            })}
          </div>
        </div>
        <MyCard />
      </div>
    </>
  )
}

export default Home
