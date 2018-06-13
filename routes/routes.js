var appRouter = function (app) {
  app.post("/accounts/verificar", function(req, res) {
      var user_id = req.body.dni;
      var token = req.body.clave;
      console.log(user_id, token);
  });
}

module.exports = appRouter;
