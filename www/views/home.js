MellitusBLE.home = function (params) {
    "use strict";
    var email = ko.observable("yoyo@string.com");
    var password = ko.observable("");
    var rememberMe = ko.observable(true);

    var loginInfo = {
        "email": email,
        "password": password,
        "rememberMe": rememberMe
    }
   

    var loginButtonClick = function () {

    }
    var viewModel = {

        loginFormOptions:
        {
            formData: loginInfo,
            showColonAfterLabel: false,
            labelLocation: 'left',
            items: [
            {
                dataField: "email",
                caption: "Email",

            },
            {
                dataField: "password",
                caption: "Password",
                editorOptions: {
                    mode: 'password',
                }

            },
            {
                dataField: "rememberMe",
                caption: "Remember Me",
                editorType: "dxCheckBox"
            }]

        },
        loginButtonOptions: {
            text: 'Login',
            type: 'success',
            useSubmitBehavior: true,
            onClick: function () {
                MellitusBLE.app.navigate("ble");
            }
        }
    };

    return viewModel;
};