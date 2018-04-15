function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var image = document.createElement("IMG");
        image.setAttribute("height", "300px");
        image.setAttribute("width", "300px");
        image.setAttribute("id", "image");
        document.getElementById('dropzone').innerHTML = "";
        reader.onload = function(e) {
            image.setAttribute('src', e.target.result);
            $('#dropzone').append(image);
        }
        reader.readAsDataURL(input.files[0]);

    }
}



function goBack() {
    window.history.back();
}

function submit() {

    var title = $('#title').val();
    var category = $('.dropdown-select').val();
    var address = $('#address').val();
    var zip = $('#zip').val();
    var description = $('#description').val();

    $.post('/submit', {
        //body
        title: title,
        category: category,
        address: address,
        zip: zip,
        description: description
    },
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
    });
}
