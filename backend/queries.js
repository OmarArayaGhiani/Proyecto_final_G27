const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const format = require("pg-format");

const pool = new Pool({
  host: process.env.HOST || "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
  port: 5432,
});
const ErrorHttp = {
  "Bad Request": 400,
  NotFound: 404,
  Unauthorized: 401,
  InternalServerError: 500,
};

const capturaErrores = (mensaje, errorHttp) => {
  let error = new Error();
  error.code = errorHttp;
  error.message = mensaje;
  throw error;
};

const verificarCredenciales = async (email, password) => {
  try {
    const values = [email];

    const consulta = "SELECT * FROM usuarios WHERE mail = $1";
    const {
      rows: [usuario], //rows: datos del usuario
      rowCount,
    } = await pool.query(consulta, values);
    const { password: passwordEncriptada } = usuario;
    
    const passok = bcrypt.compareSync(password, passwordEncriptada);
    if (!passok || !rowCount) {
      throw new Error("Usuario o contraseña no validos");
    }
  } catch (error) {
    capturaErrores(error.message, ErrorHttp.Unauthorized);
  }
};

const registrarUsuario = async (data) => {
  try {
    let { nombre, direccion, fono, password, mail } = data;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    password = passwordEncriptada;
    const values = [nombre, direccion, fono, passwordEncriptada, mail];
    console.log(values);
    const consulta =
      "insert into usuarios (nombre,direccion,fono,password,mail) " +
      " values ($1,$2,$3,$4,$5)";
    const { rowCount } = await pool.query(consulta, values);
    //if (!rowCount) throw { code: 404, message: "No se agregó el usuario" };
    if (!rowCount) {
      throw new Error("code: 404", "message: No se agregó el usuario");
    }
  } catch (error) {
    capturaErrores(error.message, ErrorHttp["Bad Request"]);
    //throw { code: 404,message: error.message };
  }
};
const verificarUsuario = async (email) => {
  try {
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE mail = $1";
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount) {
      throw new Error("Correo en uso, utilizar otro");
    }
  } catch (error) {
    capturaErrores(error.message, ErrorHttp["Bad Request"]);
  }
};

const ConvencionHATEOAS = (movies) => {
  const results = movies.map((m) => {
    return {
      id: m.id,
      titulo: m.titulo,
      precio: m.precio,
      director: m.director,
      agno: m.agno,
      //titulo_alt: m.titulo_alt,
      href: `/peliculas/${m.id}`,
    };
  });
  //.slice(0, totalJoyas);
  const total = movies.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

const GetMovies = async (param) => {
  try {
    let filtros = [];

    if (param.idcategoria > 0)
      filtros.push(`idcategoria = ${param.idcategoria}`);
    if (param.agno > 0) filtros.push(`agno = ${param.agno}`);
    if (param.titulo) filtros.push(`lower(titulo) like lower ('%${param.titulo}%')`);
    if (param.director) filtros.push(`director like %${param.director}%`);

    if (param.order_by === undefined) param.order_by = "titulo_asc";
    const [order1, order2] = param.order_by.split(",");
    const [campo, direccion] = order1.split("_");
    const [campo2, direccion2] = order2.split("_");
    if (param.limit === undefined) param.limit = 10;
    if (param.page === undefined) param.page = 1;
    const offset = (param.page - 1) * param.limit;
    let qry =
      "SELECT id,titulo,precio,director,agno,SUBSTRING (sinopsis,1,60) || '...' as sinopsis" +
      " FROM peliculas p";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      qry += ` WHERE ${filtros}`;
    }
    qry += ` order by ${campo} ${direccion},${campo2} ${direccion2} OFFSET ${offset} LIMIT ${param.limit}`;

    const { rows: movies } = await pool.query(qry);
    return movies;
  } catch (error) {
    throw { code: 404, message: error.message };
  }
};

const GetMovie = async (id) => {
  try {
    const value = [id];
    const qry =
      "SELECT id,titulo,precio,director,agno,categoria,sinopsis" +
      " FROM peliculas WHERE id = $1";
    const { rows: movies } = await pool.query(qry, value);
    return movies;
  } catch (error) {
    throw { code: 404, message: error.message };
  }
};

const GetReparto = async (id) => {
  try {
    const value = [id];
    const qry =
      "SELECT idpelicula,actor,rol FROM reparto WHERE idpelicula = $1";
    const { rows: reparto } = await pool.query(qry, value);
    return reparto;
  } catch (error) {
    throw { code: 404, message: error.message };
  }
};

const GetCategorias2 = async () => {
  try {
    const qry =
      "SELECT idcategoria,nombre FROM categoria WHERE activo = true ORDER BY nombre";
    const { rows: categories } = await pool.query(qry);
    return categories;
  } catch (error) {
    throw { code: 404, message: error.message };
  }
};

const GetCategorias = async () => {
  try {
    const qry =
      "select c.idcategoria as ID, c.nombre || ' (' || count(c.nombre) || ')' as Categoria," +
      " c.nombre, c.activo from pelicula p" +
      " inner join categoria c on p.idcategoria = c.idcategoria" +
      " group by c.nombre,c.idcategoria,c.nombre, c.activo" +
      " order by c.nombre";

    const { rows: categories } = await pool.query(qry);
    return categories;
  } catch (error) {
    throw { code: 404, message: error.message };
  }
};

const getUsuario = async (email) => {
  try {
    const value = [email.correo];
    const qry = "SELECT * FROM usuario WHERE correo = $1";
    const { rows: usuario } = await pool.query(qry, value);
    return usuario;
  } catch (error) {
    capturaErrores(error.message, ErrorHttp.Unauthorized);
  }
};

const deleteUsuario = async (id) => {
  const consulta = "DELETE FROM usuarios WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw { code: 404, message: "No se encontró ningún usuario con id $1" };
};

const updateUsuario = async (id, body) => {
  try {
    const { rol, lenguage } = body;
    const values = [rol, lenguage, id];

    //Query parametrizada
    const qry = "UPDATE usuarios SET rol = $1,lenguage = $2 WHERE id = $3";

    const { rowCount } = await pool.query(qry, values);
    if (!rowCount)
      throw { code: 404, message: `No existe usuario con id ${id}` };
  } catch (error) {
    console.log("error:" + error);
    throw { code: 500, error: error.message };
  }
};

const updatePaswword = async (id, body) => {
  try {
    const { password } = body;
    const values = [id];

    const qry = "SELECT id FROM usuarios WHERE id = $1";
    const { rowCount } = await pool.query(qry, values);
    if (!rowCount)
      throw {
        code: 404,
        message: `No se encontró ningún usuario con id ${id}`,
      };
    else {
      const passwordEncriptada = bcrypt.hashSync(password, 10);
      const values = [passwordEncriptada, id];
      const qry = "UPDATE usuarios SET password = $1 WHERE id = $2";
      const { rowCount } = await pool.query(qry, values);
    }
  } catch (error) {
    console.log("error:" + error);
    throw { code: 500, error: error.message };
  }
};

module.exports = {
  verificarCredenciales,
  registrarUsuario,
  verificarUsuario,
  getUsuario,
  GetMovie,
  GetMovies,
  deleteUsuario,
  updateUsuario,
  updatePaswword,
  ConvencionHATEOAS,
  GetCategorias,
  GetReparto,
};
