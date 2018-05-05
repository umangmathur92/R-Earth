var listings = [];
var index = 0;
var cards = [];


$(document).ready(function () {
    $.get('/listings', {test: "title"},
    function(data, status){
        listings = data;
        update();
    });
    //test for adding cards
    document.getElementById('test').addEventListener("click", function() {
        document.getElementById('listings').appendChild(createCard({title: "This is where the title will go", address: "1800 Holloway San Francisco, California zip code", description: "This is where the description will go bullshit bullshit bullshit. asdfasdfasdfasdfasdf"}));

    });

    //date-sort button
    document.getElementById('date-sort').addEventListener("click", function() {
        $.get('/listings', {test: "date"},
        function(data, status){
            listings = data;
            update();
        });
    });

    //title-sort button
    document.getElementById('title-sort').addEventListener("click", function() {
        $.get('/listings', {test: "title"},
        function(data, status){
            listings = data;
            update();
        });

    });

    //status-sort button
    document.getElementById('status-sort').addEventListener("click", function() {
        $.get('/listings', {test: "status"},
        function(data, status){
            listings = data;
            update();
        });
    });

    //address-sort button
    document.getElementById('address-sort').addEventListener("click", function() {
        $.get('/listings', {test: "address"},
        function(data, status){
            listings = data;
            update();
        });
    });
});



//creates card with necessary id and classes
function createCard(info) {

    console.log(info.status);

    var card = document.createElement('div');
    card.className = "card";
    card.index = index++;

    var cardbody = document.createElement('div');
    cardbody.className = "card-body text-primary";

    //date
    var date = document.createElement('div');
    date.className = "card-title";
    date.id = "title";
    date.innerHTML = "11/21/1994";

    //title
    var title = document.createElement('div');
    title.className = "card-title";
    title.id = "title";
    title.innerHTML = info.title;

    //address
    var address = document.createElement('div');
    address.id = "address";
    address.className = "card-text";
    address.innerHTML = info.address;


    //description
    var description = document.createElement('div');
    description.id = "description";
    description.className = "card-text";
    description.innerHTML = info.description;


    //modal
    var modal = document.createElement('div');
    modal.className ="card-text";
    modal.id = "modal-button";

    var button = document.createElement('button');
    button.className = "btn";
    button.innerHTML = "Update";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.addEventListener("click", function(){
        index = card.index;
        document.getElementById("modal-title").innerHTML = "<strong>" + info.title + "</strong>";
    });


    //dropdown menu
    //TODO: correct default values
    var dropdown = document.createElement('div');
    dropdown.className = "card-text";
    dropdown.id = "dropdown";
    var dd = document.createElement('div');
    dd.className = "dropdown";
    var select = document.createElement('select');
    select.className = "dropdown-select";
    select.name = "one";

    var option1 = document.createElement('option');
    option1.value = 1;
    option1.id = "option";
    option1.innerHTML = "Unverified";
    var option2 = document.createElement('option');
    option2.value = 2;
    option2.id = "option";
    option2.innerHTML = "Acknowledged";
    var option3 = document.createElement('option');
    option3.value = 3;
    option3.id = "option";
    option3.innerHTML = "In Progress";
    var option4 = document.createElement('option');
    option4.value = 4;
    option4.id = "option";
    option4.innerHTML = "Fixed";

    switch(info.status){
        case 0:
            option1.setAttribute("selected", "selected");
            break;
        case 1:
            option2.setAttribute("selected", "selected");
            break;
        case 2:
            option3.setAttribute("selected", "selected");
            break;
        case 3:
            option4.setAttribute("selected", "selected");
            break;
    }

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    dd.appendChild(select);
    dropdown.appendChild(dd);



    //save button
    var save = document.createElement('div');
    save.className = "card-text";
    save.id = "save";
    var sbutton = document.createElement('button');
    sbutton.className = "btn";
    sbutton.innerHTML = "Save";
    save.appendChild(sbutton);

    //assembling the card
    card.appendChild(cardbody);
    cardbody.appendChild(date);
    cardbody.appendChild(title);
    cardbody.appendChild(address);
    cardbody.appendChild(description);
    cardbody.appendChild(modal);
    modal.appendChild(button);
    cardbody.appendChild(dropdown);
    cardbody.appendChild(save);

    cards.push(card);
    return card;
}

function update(){
    cards = [];
    var info;
    for(var i = 0; i < listings.length; i++){
        info = {title: listings[i].title,
            address: listings[i].address,
            description: listings[i].description,
            status: listings[i].status
        };
        document.getElementById('listings').appendChild(createCard(info));

    }
}