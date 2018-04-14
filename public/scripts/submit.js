function dragover(event){
    event.preventDefault();
    event.target.style.border = "4px dashed black";
}

function dragexit(event){
    event.preventDefault();
    event.target.style.border = "4px dashed white";
}

function drop(event){
    event.preventDefault();
    event.target.style.border = "4px dashed white";
    var image = document.createElement("IMG");
    image.setAttribute("src", "/images/dolores_trash.jpg");
    image.setAttribute("id", "image");
    image.setAttribute("height", "300px");
    image.setAttribute("width", "300px");
    event.target.innerText = "";
    event.target.append(image);
}