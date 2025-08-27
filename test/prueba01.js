process.env.NODE_ENV = "test";
const server = require("../server");
const assert = require("chai").assert;
const chai = require("chai");
const chaiHttp = require("chai-http");
const { before, describe, it } = require("mocha");

chai.use(chaiHttp);

before(function (done) {
  server.on("appStarted", function () {
    done();
  });
});

describe("02 prueba peticiones usaremos chai-http", () => {
  it("probando el status get a la raiz", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  let idTarea = "";

  it("Insertanto datos", (done) => {
    chai
      .request(server)
      .post("/tareas")
      .send({ nombre: "Insertando prueba de chai", hecho: false })
      .end((err, res) => {
        idTarea = res.body.id;
        assert.equal(res.status, 200);
        done();
      });
  });

  //verificar si la nueva tarea esta en la ruta /tareas
  it("verificando que la tarea se inserto", (done) => {
    chai
      .request(server)
      .get("/tareas")
      .end((err, res) => {
        assert.equal(res.status, 200);
        let tareas = res.body;
        let tarea = tareas.find((tar) => tar._id == idTarea);
        assert.equal(tarea._id, idTarea);
        done();
      });
  });

  it("Eliminando la tarea insertada", (done) => {
    chai
      .request(server)
      .delete("/tareas/delete/" + idTarea)
      .end((err, res) => {
        assert.equal(res.status, 204);
        done();
      });
  });
});
