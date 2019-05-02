function bug() {
    var texte = document.getElementById('texte').value;
    var categorie = document.querySelector('input[name="categorie"]:checked').value;
    var importance = document.querySelector('input[name="importance"]:checked').value;

    var phrase = importance + "," + categorie + "," + texte;

    alt.emitServer('chatmessage', phrase);
}