let mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,


    // Navigation arrows
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    slidesPerView: 6,
    spaceBetween: -74
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVudnJhZGl5IiwiYSI6ImNqeDM4OHJ2czBnNzg0OXB5dDV4bmlzbTgifQ.Mpyj8KRF_3BcYoRhTlH9yA';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [30.590726, 50.428568],
        zoom: 16
    });
}

