function bug() {
  var texte = document.getElementById("texte").value;
  var importance = document.querySelector('input[name="importance"]:checked')
    .value;

  var phrase = "/ticket " + importance + ", " + texte;

  alt.emitServer("chatmessage", phrase);
}
