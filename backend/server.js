const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  GetMovies, GetMovie, ConvencionHATEOAS, GetCategorias, GetReparto, verificarCredenciales,
  registrarUsuario, getUsuario
} = require("./queries");
const { validaLogin, usuarioExiste, verificarToken, decodificarToken } = require("./middleware");
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Escuchando por el puerto ${PORT}`))
app.use(cors());
app.use(express.json());


app.post("/login", validaLogin, async (req, res) => {
  try {
    const { mail, password } = req.body;

    await verificarCredenciales(mail, password);

    const token = jwt.sign({ mail }, process.env.TOKEN, { expiresIn: "10h" });
    res.send(token);
  } catch (error) {

    res.status(error.code || 500).send(error.message);
  }
});

app.post("/registro", validaLogin, usuarioExiste, async (req, res) => {
  try {

    await registrarUsuario(req.body);
    res.status(201).send({ code: 201, message: 'Usuario creado' });
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

app.get("/usuario/:correo", async (req, res) => {
  try {
    //console.log(req.params)
    const usuario = await getUsuario(req.params);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

app.get("/peliculas", async (req, res) => {
  try {
    const movies = await GetMovies(req.query);
    //const conv = await ConvencionHATEOAS(movies);    
    res.json(movies);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/categorias", async (req, res) => {
  try {
    const categ = await GetCategorias();
    res.json(categ);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/peliculas/:id", async (req, res) => {
  try {
    const movies = await GetMovie(req.params.id);
    //const hate = await prepararHATEOAS(joyas);    
    res.json(movies);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/reparto/:id", async (req, res) => {
  try {

    const movies = await GetReparto(req.params.id);
    //const hate = await prepararHATEOAS(joyas);    
    res.json(movies);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = app