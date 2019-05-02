function add_question(texte) {
    var span = document.getElementById("question");
    span.innerHTML = texte;
}

function add_content(texte) {

    var span = document.getElementById("content");
    span.innerHTML = texte;
}

function add_left_button(texte) {

    var button = document.getElementById("buttonL");
    button.innerHTML = texte;
    button.addEventListener("click", function () {
        alt.emitServer('chatmessage', '/accepter');


    })
}

function add_right_button(texte) {

    var button = document.getElementById("buttonR");
    button.innerHTML = texte;
    button.addEventListener("click", function () {
        alt.emitServer('chatmessage', '/refuser');
    })
}