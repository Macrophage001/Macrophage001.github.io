const posts = document.getElementsByClassName('post');
const navigationBar = document.getElementById('navigation-bar-id');
let isMenuVisible = false;

const updateMenuVisibility = () => {
    if (isMenuVisible) {
        navigationBar.style.width = '14rem';
    } else {
        navigationBar.style.width = '0';
    }
}
const toggleMenu = () => {
    isMenuVisible = !isMenuVisible;
    console.log('Is Menu Visible: ' + isMenuVisible);
    updateMenuVisibility();
}