
(function() {
    'use strict';

    var app = {
        isLoading: true,
        spinner: document.querySelector('.loader'),
        loginRow: document.getElementById('login_row')
    };

    /*****************************************************************************
    *
    * Event listeners for UI elements
    *
    ****************************************************************************/
    document.getElementById('btn_ingresar').addEventListener('click', function() {
        var data = JSON.stringify({
            "dni": document.getElementById('login_dni').value,
            "password": document.getElementById('login_password').value
        });
        app.verificarCuenta(data);
    });

    app.hideloginRow = function () {
        app.loginRow.setAttribute('hidden', true);
    };

    app.verificarCuenta = function (data){
        var url = 'http://localhost:3000/accounts/verificar'
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                app.hideloginRow();
              // var response = JSON.parse(request.response);
              // var results = response.query.results;
              // results.key = key;
              // results.label = label;
              // results.created = response.query.created;
              // app.updateForecastCard(results);
            }
          } else {
            // // Return the initial weather forecast since no data is available.
            // app.updateForecastCard(initialWeatherForecast);
          }
        };
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(data);
    };
})();;
