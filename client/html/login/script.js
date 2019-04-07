var noIds = document.getElementById('vide');

function noId() {
  if (noIds.value == '') {
    noIds.textContent = 'Veuillez saisir vos identifiants';
  } else {
    noIds.textContent = 'Veuillez saisir vos identifiants';
  }
}

document.getElementById('login').onsubmit = function () {
  if (
    (document.getElementById('mail').value == '') |
    (document.getElementById('password').value == '')
  ) {


    noId();
    $('.login-area').css('height', '400px');


    return false;
  } else {
    //Fonction de connexion à insérér ci dessous

  }
};