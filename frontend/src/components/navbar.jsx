import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai"
import "../css/css-components/navbar.css"

const MyNavbar = () => {
  return (
    <>
      <Navbar expand="sm" className="bg-info">
        <Container fluid>
          <Navbar.Toggle />
          <Nav.Link href="#action2" className="d-block d-sm-none">
            <AiOutlineUser className="icon" />
          </Nav.Link>
          <Navbar.Offcanvas className="bg-info">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Nombre Empresa</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-evenly flex-grow-1 pe-3">
                <Nav.Link
                  href="#action1"
                  className=" p-2 d-flex align-items-center"
                >
                  <AiOutlineHome className="icon" />
                  <p>Inicio</p>
                </Nav.Link>
                <Nav.Link
                  href="#action1"
                  className="d-flex d-sm-none p-2 align-items-center"
                >
                  <AiOutlineShoppingCart className="icon" />
                  <p>Carrito</p>
                </Nav.Link>
                <Nav.Link
                  href="#action2"
                  className="d-none d-sm-flex p-2 align-items-center"
                >
                  <AiOutlineUser className="icon" />
                  <p>Iniciar Sesión</p>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div class="p-4">
        <div class="container-fluid">
          <div class="row">
            <div class="col col-6 col-md-3">
              <a href="">
                <p>LOGO/NOMBRE EMPRESA</p>
              </a>
            </div>
            <form class="d-none d-md-flex col-6 align-items-center">
              <input class="form-control" placeholder="Buscar productos" />
            </form>
            <div class="col col-6 col-md-3 d-flex align-items-center justify-content-end">
              <div class="d-flex border border-1 rounded-3">
                <div class="ps-2 d-flex align-items-center">
                  <AiOutlineShoppingCart className="icon" />
                  <span className="ms-2">0</span>
                </div>
                <div class="p-3">
                  <span>Carrito</span>
                  <span class="ms-2">$0</span>
                </div>
              </div>
            </div>
            <form class="d-flex d-md-none py-3 align-items-center">
              <input class="form-control" placeholder="Buscar productos" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyNavbar
