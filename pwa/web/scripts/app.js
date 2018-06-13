
(function() {
    'use strict';

    var app = {
        isLoading: true,
        userData: {},
        preloader: document.querySelector('.preloader-background'),
        loginRow: document.getElementById('login_row'),
        loginError: document.getElementById('login_error'),
        navBar: document.getElementById('nav_bar'),
        drawer: document.getElementById('drawer'),
        drawerNombre: document.getElementById('drawer-nombre'),
        drawerDni: document.getElementById('drawer-dni')
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

    document.addEventListener('DOMContentLoaded', function(){
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
        app.preloader.classList.add('hide');
        app.showLoginRow();
    });
    /*****************************************************************************
    *
    * UI elements manipulation
    *
    ****************************************************************************/

    app.showLoginRow = function () {
        app.loginRow.classList.remove("hide");
    };
    app.hideLoginRow = function () {
        app.loginRow.classList.add("hide");
    };
    app.showLoginError = function () {
        app.loginError.classList.remove("hide");
    };
    app.showNavigation = function() {
        app.navBar.classList.remove("hide");
        app.drawer.classList.remove("hide");
        app.drawerNombre.textContent = app.userData.nombre;
        app.drawerDni.textContent = app.userData.dni;
    };

    /*****************************************************************************
    *
    * Comunicacion con el servidor
    *
    ****************************************************************************/

    app.verificarCuenta = function (data){
        var url = 'accounts/login'
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                app.userData = JSON.parse(request.response);
                app.hideLoginRow();
                app.showNavigation();
              // app.updateForecastCard(results);
            }
            if (request.status === 401) {
                app.showLoginError();
            }
            if (request.status === 500) {
                app.showLoginError();
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
