;
Dropzone.autoDiscover = false

var uploadZone = document.getElementsByClassName('upload-zone')[0];
var orderStorage = new OrderStorage(localStorage);

orderStorage.reset();

var resetButton = document.getElementsByClassName('order-ctrl--reset')[0];

resetButton.addEventListener("click", function() {
    orderStorage.reset();
    myDropzone.removeAllFiles(true)
    document.getElementsByClassName('order-crtl--client-email')[0].value = ''
    document.getElementById('success_info').classList.add('hidden');
    document.getElementById('error_info').classList.add('hidden');
    document.getElementById('confirm_button').removeAttribute("disabled");
}, false);

var myDropzone = new Dropzone(
    "form.upload-zone",
    {
        init: function() {
            this.on('success', function(file, data) {
                orderStorage.addItem(data.key);
            })
        },
        url: uploadZone.getAttribute("data-upload-url"),
        paramName: 'uploaded_media'
    }
);

var confirmationForm = document.getElementsByClassName('order-ctrl')[0];


var orderHandler = new OrderHandler(
    orderStorage,
    new OrderService(confirmationForm.getAttribute('action'), axios)
);

