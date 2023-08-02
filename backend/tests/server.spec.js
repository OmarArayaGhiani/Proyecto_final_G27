const { Pool } = require("pg");

const request = require("supertest");
const server = require("../server");
const queries = require("../queries");
jest.mock('pg', () => {
    const mClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});

jest.mock('../queries.js', () => {
    return {
        verificarCredenciales: jest.fn(),
        registrarUsuario: jest.fn(),
        verificarUsuario: jest.fn(),
        getUsuario: jest.fn(),
        GetMovie: jest.fn(),
        GetMovies: jest.fn(r => [{
            "id": 4,
            "titulo": "avatar",
            "precio": 15000,
            "director": "james cameron",
            "agno": 2009,
            "sinopsis": "En un exuberante planeta llamado Pandora viven los Navi, ser..."
        }]),
        deleteUsuario: jest.fn(),
        updateUsuario: jest.fn(),
        updatePaswword: jest.fn(),
        ConvencionHATEOAS: jest.fn(),
        GetCategorias: jest.fn(),
        GetReparto: jest.fn(),
    };
});
describe("Get Peliculas", () => {
    it("GET /peliculas", async () => {
        jest.spyOn(queries, "GetMovies").mockImplementation(() => [{
            "id": 4,
            "titulo": "avatar",
            "precio": 15000,
            "director": "james cameron",
            "agno": 2009,
            "sinopsis": "En un exuberante planeta llamado Pandora viven los Navi, ser..."
        }]);
        const res = await request(server).get("/peliculas").send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    })

    it("GET /peliculas - Error", async () => {
        jest.spyOn(queries, "GetMovies").mockImplementation(() => {
            throw new Error("Error");
        });
        const res = await request(server).get("/peliculas").send();
        expect(res.statusCode).toEqual(400);
    })
});

describe("Get Pelicula", () => {
    it("GET /peliculas/1", async () => {
        jest.spyOn(queries, "GetMovie").mockImplementation(() => {
            return {
                "id": 1,
                "titulo": "avatar",
                "precio": 15000,
                "director": "james cameron",
                "agno": 2009,
                "sinopsis": "En un exuberante planeta llamado Pandora viven los Navi, ser..."
            }
        });
        const res = await request(server).get("/peliculas/1").send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
    })

    it("GET /peliculas - Error", async () => {
        jest.spyOn(queries, "GetMovie").mockImplementation(() => {
            throw new Error("Error");
        });
        const res = await request(server).get("/peliculas/1").send();
        expect(res.statusCode).toEqual(400);
    })
});

describe("Login", () => {
    it("GET /login", async () => {
        jest.spyOn(queries, "verificarCredenciales").mockImplementation(() => "jwt token");
        const res = await request(server).post("/login").send(
            {
                "mail": "correo@gmail.com",
                "password": "12345"
            }
        );
        expect(res.statusCode).toEqual(200);
    })

    it("GET /login - Error", async () => {
        jest.spyOn(queries, "verificarCredenciales").mockImplementation(() => {
            throw new Error("Error");
        });
        const res = await request(server).post("/login").send();
        expect(res.statusCode).toEqual(500);
    })
});


describe("Registro", () => {
    it("GET /registro", async () => {
        jest.spyOn(queries, "registrarUsuario").mockImplementation(() => {
            return "Usuario registrado correctamente"
        });
        const res = await (await request(server).post("/registro").send({
            "mail": "correo@gmail.com",
            "password": "12345",
            "nombre": "Cliente 1",
            "direccion": "Dirección 12345",
            "fono": "912345678"
        }));
        expect(res.statusCode).toEqual(201);
    })

    it("GET /registro - Error", async () => {
        jest.spyOn(queries, "registrarUsuario").mockImplementation(() => {
            throw new Error("Error");
        });
        const res = await request(server).post("/registro").send();
        expect(res.statusCode).toEqual(500);
    })
});