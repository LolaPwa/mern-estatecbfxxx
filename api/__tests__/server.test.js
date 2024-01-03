import request from "supertest";
import app from "../index.js";
import {setupbeforeAll, setupafterAll} from "../../setupTests.js";

beforeAll(async () => {
  await setupbeforeAll();
});

afterAll(async () => {
    await setupafterAll();
});

describe('Property Listing App', () => {
    it("should fetch all properties", async ()=> {
        const response = await request(app).get('/api/listing');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    it("should add a new property", async ()=> {
        const newProperty = {name: 'Sample Property', regularPrice:10000};
        const response = await request(app).post('/api/listing').send(newProperty);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newProperty);
  
        const properties= await request(app).get('/api/listing');
        expect(properties.body).toHaveLength(1);
        expect(properties.body[0]).toMatchObject(newProperty);

});

});
