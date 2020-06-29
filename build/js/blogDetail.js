document.querySelector('link[rel=icon]').setAttribute('href','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpgcetIvWf03I98S8O3kWBNgGroXosG5idqvQNVn6s3b75hM32&usqp=CAU0');

document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '1';
});

//removing social media and follow buttons and the div containing claps;
document.querySelectorAll('button').forEach(button => {
    if(!button.classList.contains('mine'))
        button.parentNode.removeChild(button);
});
// document.querySelectorAll('div.n.y').forEach(div => {
//     div.parentNode.removeChild(div);
// });

//removing register button;
var register = document.querySelector('div.q');
register.parentNode.removeChild(register);

//removing figures that contains i frame and cannot be loaded;
document.querySelectorAll('figure').forEach(figure => {
    var img = figure.querySelector('img');
    var iframe = figure.querySelector('iframe');
    if(!img && !iframe)
        figure.parentNode.removeChild(figure);
});

//making all the wordpress or medium links not to work 
document.querySelectorAll('a[rel=noopener]').forEach(a => {
    if(a.getAttribute('id')!== 'reconstructed-link'){
        a.addEventListener('click',e => e.preventDefault());
        a.classList.add('no-hover-effect');
    }
});
document.querySelectorAll('.no-hover-effect').forEach(a => {
    if(a.getAttribute('id') !== 'reconstructed-link'){
        a.addEventListener('click', e => e.preventDefault());
    }
})