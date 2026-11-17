// Supertest
const supertest = require("supertest");
// Server express
const server = require("../app");
// Conexion de bbdd pg
const pool = require("../config/db_pgsql");


// Lanzar server con supertest --> npm start
const request = supertest(server);


afterAll(async () => {
    await pool.end();
});


describe("Testing endpoints de /api/entries", () => {

    it("GET test /api/entries should return 200", async () => {
        const response = await request.get("/api/entries").expect(200);
    });

    it("GET test api/entries should return an array", async () => {
        const response = await request.get("/api/entries")
        expect(response.body).toEqual(expect.any(Array));
    })

    it("POST test api/entries returns 201 on creation", async () => {
        const response = await request.post("/api/entries?API_KEY=asefdw34fsrac3423").send({
            title: "titulo test",
            content: "contenid test",
            email: "email@test.com",
            category: "Ciencia"
        }).expect(201)
    })

    it("POST test api/entries should return and object {items_created, data}", async () => {
        const response = await request.post("/api/entries?API_KEY=asefdw34fsrac3423").send({
            title: "titulo test",
            content: "contenid test",
            email: "email@test.com",
            category: "Ciencia"
        })

        expect(response.body).toEqual(
            expect.objectContaining({
                items_created: expect.any(Number),
                data: expect.objectContaining({
                    title: "titulo test",
                    content: "contenid test",
                    email: "email@test.com",
                    category: "Ciencia"
                })
            })
        )
    })

    /*  {
         "items_created": response,
         data: newEntry
     } */
})


