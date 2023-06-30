var navLinks = document.getElementById("navLinks");

function showMenu(){
    navLinks.style.right = "0";
}
function hideMenu(){
    navLinks.style.right = "-500px";
}

const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");

openMenu.onclick = showMenu;
closeMenu.onclick = hideMenu;

/*JS para la navbar

var navbar = document.getElementById("navbar");
var menu = document.getElementById("menu");

window.onscroll = function(){
  if(window.pageYOffset >= menu.offsetTop){
      navbar.classList.add("sticky");
  }
  else{
      navbar.classList.add("sticky");
  }
}

const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");

openMenu.onclick = showMenu;
closeMenu.onclick = hideMenu;
*/