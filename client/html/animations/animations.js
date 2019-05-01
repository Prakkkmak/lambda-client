function add_buttonanim(label, anim)
{
    let container = document.querySelector('.wrapper');
    let button = document.createElement('button');
    button.innerHTML = label;
    button.setAttribute('class', 'tiny-button');
    button.addEventListener('click', () => {
        alt.emit('playAnim', anim);
    });
    container.appendChild(button);

}

