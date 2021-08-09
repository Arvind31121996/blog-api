let { app: server } = require("../dist/");
let chai = require("chai");
let chaiHttp = require("chai-http");
// Assertion
chai.should();
chai.use(chaiHttp);

before(function (done) {
  server.on("appStarted", function () {
    done();
  });
});

describe("Article and Comment API", () => {
  describe("/api/v1/article", () => {
    it("It post an articles", (done) => {
      let data = {
        title: "Node.js uplaod application",
        content: "This is content of article with no minimum size",
        nickname: "Kadyan",
      };
      chai
        .request(server)
        .post("/api/v1/article")
        .send(data)
        .end((err, response) => {
          console.log(response);
          console.log(err);
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("/api/v1/article", () => {
    it("It should return all articles", (done) => {
      chai
        .request(server)
        .get("/api/v1/article")
        .end((err, response) => {
          console.log(response);
          response.should.have.status(200);
          response.body.response.data.articleList.should.be.a("array");
          done();
        });
    });
  });

  describe("/api/v1/article/2", () => {
    it("It should return one articles", (done) => {
      chai
        .request(server)
        .get("/api/v1/article/2")
        .end((err, response) => {
          console.log(response);
          response.should.have.status(200);
          response.body.response.data.should.be.a("object");
          done();
        });
    });
  });

  describe("/api/v1/comment", () => {
    it("It post a comment on article", (done) => {
      let data = {
        articleId: 3,
        nickname: "kadyan",
        content: "this is forth id comment",
      };
      chai
        .request(server)
        .post("/api/v1/comment")
        .send(data)
        .end((err, response) => {
          console.log(response);
          console.log(err);
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("/api/v1/comment-comment", () => {
    it("It post a comment on comment", (done) => {
      let data = {
        commentId: 3,
        content: "This is a comment on comment against comment",
      };
      chai
        .request(server)
        .post("/api/v1/comment-comment")
        .send(data)
        .end((err, response) => {
          console.log(response);
          console.log(err);
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("/api/v1/article-comment/2", () => {
    it("It get an article with comments", (done) => {
      chai
        .request(server)
        .get("/api/v1/article-comment/2")
        .end((err, response) => {
          console.log(response);
          response.should.have.status(200);
          response.body.response.data.should.be.a("object");
          done();
        });
    });
  });
});
