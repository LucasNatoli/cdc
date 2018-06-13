var appRouter = function (app) {
  app.get("/hello", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
}

module.exports = appRouter;
