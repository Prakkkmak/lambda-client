function clean() {
  var div = document.getElementById("content");
  div.innerHTML = "";
}

function aconsulter() {
  var btncons = document.createElement("button");
  var tcons = document.createTextNode("Consulter");
  btncons.appendChild(tcons);
  btncons.classList.add("button");
  btncons.setAttribute("id", "consulter");
  var div = document.getElementById("content");
  div.appendChild(btncons);
}
function adeposer() {
  var btndep = document.createElement("button");
  var tdep = document.createTextNode("Déposer");
  btndep.appendChild(tdep);
  btndep.classList.add("button");
  btndep.setAttribute("id", "deposer");
  var div = document.getElementById("content");
  div.appendChild(btndep);
  btndep.addEventListener("click", function() {
    affdeposer();
  });
}
function aretirer() {
  var btnrer = document.createElement("button");
  var trer = document.createTextNode("Retirer");
  btnrer.appendChild(trer);
  btnrer.classList.add("button");
  btnrer.setAttribute("id", "retirer");
  var div = document.getElementById("content");
  div.appendChild(btnrer);
  btnrer.addEventListener("click", function() {
    affretirer();
  });
}
function avirement() {
  var btnvir = document.createElement("button");
  var tvir = document.createTextNode("Virement");
  btnvir.appendChild(tvir);
  btnvir.classList.add("button");
  btnvir.setAttribute("id", "virement");
  var div = document.getElementById("content");
  div.appendChild(btnvir);
  btnvir.addEventListener("click", function() {
    affvirement();
  });
}

function affaccueil() {
  clean();
  aconsulter();
  aretirer();
  avirement();
  adeposer();
}
function rdnombre() {
  var inputform = document.createElement("input");
  inputform.setAttribute("type", "text");
  inputform.setAttribute("id", "rdnombre");
  inputform.setAttribute("placeholder", "Indiquer montant");
  inputform.setAttribute("pattern", "[0-9]");
  var form = document.getElementById("content");
  form.appendChild(inputform);
}

function rretirer() {
  var btnrer = document.createElement("button");
  var trer = document.createTextNode("Retirer");
  btnrer.appendChild(trer);
  btnrer.classList.add("button");
  btnrer.setAttribute("id", "dretirer");
  var div = document.getElementById("content");
  div.appendChild(btnrer);
  btnrer.addEventListener("click", function() {
    retirer();
  });
}

function retour() {
  var btnrer = document.createElement("button");
  var trer = document.createTextNode("Retour");
  btnrer.appendChild(trer);
  btnrer.classList.add("button");
  btnrer.setAttribute("id", "retour");
  var div = document.getElementById("content");
  div.appendChild(btnrer);
  btnrer.addEventListener("click", function() {
    affaccueil();
  });
}

function affretirer() {
  clean();
  rretirer();
  retour();
  rdnombre();
}

function rdeposer() {
  var btnrer = document.createElement("button");
  var trer = document.createTextNode("Deposer");
  btnrer.appendChild(trer);
  btnrer.classList.add("button");
  btnrer.setAttribute("id", "ddeposer");
  var div = document.getElementById("content");
  div.appendChild(btnrer);
  btnrer.addEventListener("click", function() {
    deposer();
  });
}

function affdeposer() {
  clean();
  rdeposer();
  retour();
  rdnombre();
}

function vnombre() {
  var inputform = document.createElement("input");
  inputform.setAttribute("type", "text");
  inputform.setAttribute("id", "vnombre");
  inputform.setAttribute("placeholder", "Indiquer montant");
  inputform.setAttribute("pattern", "[0-9]");
  var form = document.getElementById("content");
  form.appendChild(inputform);
}

function vnom() {
  var inputform = document.createElement("input");
  inputform.setAttribute("type", "text");
  inputform.setAttribute("id", "vnom");
  inputform.setAttribute("placeholder", "Nom");
  inputform.setAttribute("pattern", "[a-zA-Z-]");
  var form = document.getElementById("content");
  form.appendChild(inputform);
}

function vprenom() {
  var inputform = document.createElement("input");
  inputform.setAttribute("type", "text");
  inputform.setAttribute("id", "vprenom");
  inputform.setAttribute("placeholder", "Prénom");
  inputform.setAttribute("pattern", "[a-zA-Z-]");
  var form = document.getElementById("content");
  form.appendChild(inputform);
}
function vvirement() {
  var btnrer = document.createElement("button");
  var trer = document.createTextNode("Virer");
  btnrer.appendChild(trer);
  btnrer.classList.add("button");
  btnrer.setAttribute("id", "vvirement");
  var div = document.getElementById("content");
  div.appendChild(btnrer);
  btnrer.addEventListener("click", function() {
    virement();
  });
}

function affvirement() {
  clean();
  vnom();
  vprenom();
  vnombre();
  vvirement();
  retour();
}

function deposer() {
  var montant = document.getElementById("rdnombre").value;
  if (isNaN(montant)) {
  } else {
    phrase = "/deposer " + montant;
    console.log(phrase);
  }
}
function retirer() {
  var montant = document.getElementById("rdnombre").value;
  if (isNaN(montant)) {
  } else {
    phrase = "/retirer " + montant;
    console.log(phrase);
  }
}

function virement() {
  var montant = document.getElementById("vnombre").value;
  var nom = document.getElementById("vnom").value;
  var prenom = document.getElementById("vprenom").value;

  if (isNaN(montant)) {
  }
  if (nom === "") {
  }
  if (prenom === "") {
  } else {
    phrase = "/virement " + montant + " " + nom + " " + prenom;
    console.log(phrase);
  }
}

affaccueil();
