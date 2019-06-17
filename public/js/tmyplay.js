var mySwiper = new Swiper('.swiper-container', {
    loop : true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    thumbs: {
        swiper: {
            el: '.swiper-container-thumbs',
            slidesPerView: 4,
            spaceBetween: 10,
            watchSlidesVisibility: true,
        },
    },
    slideThumbActiveClass: 'my-slide-thumb-active',
});
