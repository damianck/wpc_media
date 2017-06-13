;

var handleOrderForm = function(form) {
    var emailField = document.getElementsByClassName('order-crtl--client-email')[0];
    var email = emailField.value;

    orderHandler.requestForEmail(email);
}


var OrderHandler = function(orderStorage, orderService) {
    return {
        requestForEmail: function(email) {
            var request = {
                'email': email,
                'photos': orderStorage.getAllMedias()
            };
            if (request.photos && request.photos.length > 0) {
                document.getElementById('error_info').classList.add('hidden');
                orderService.requestOrder(request);
            } else {
                setTimeout(function() {
                    document.getElementById('error_info').classList.add('hidden');
                }, 5000)
                document.getElementById('error_info').classList.remove('hidden');
            }
        }
    }
}

var alertClose = function(id) {
    document.getElementsByClassName('close')[0].addEventListener("click", function () {
        document.getElementById(id).classList.add('hidden');
    });
}

var OrderService = function(confirmationEndpoint, http) {
    return {
        requestOrder: function(request) {
            http.post(confirmationEndpoint, request)
                .then(function (response) {
                    document.getElementById('confirm_button').setAttribute("disabled", "disabled");
                    document.getElementById('success_info').classList.remove('hidden');
                    alertClose('success_info');
                })
            ;
        }
    }
}



