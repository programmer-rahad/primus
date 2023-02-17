// RAW Javascript
document.addEventListener('DOMContentLoaded', function () {
    // Side Navigation
    !function () {
        var container = document.querySelector('header .container');
        var sideNav = document.querySelector('div.side-nav');
        var mainNavigation = document.querySelector('nav.main-navigation');
        var menuButton = document.querySelector('nav.main-navigation > ul > li:last-child a.menu-icon');

        menuButton.addEventListener('click', function () {
            mainNavigation.classList.toggle('hide-menu');
            sideNav.classList.toggle('d-none');
            container.classList.toggle('show-orange-bar')
        });


        // Side Nav Dropdown
        var buttons = document.querySelectorAll('.side-nav > ul > li > a');
        var subMenus = document.querySelectorAll('.side-nav > ul > li ul');
        buttons.forEach(function (button) {
            button.addEventListener('click', function (e) {

                if (innerWidth < 576) {

                    if (this.nextElementSibling) {
                        e.preventDefault();
                        // subMenus.forEach(function (ul) {
                        //     ul.classList.add('d-none');
                        // })
                        let display = getComputedStyle(this.nextElementSibling).display;
                        if(display === 'block') {
                            this.nextElementSibling.style.display = 'none';
                        } else {
                            this.nextElementSibling.style.display = 'block';
                        }
                        // this.nextElementSibling.animate([
                        //     { opacity: '0' },
                        //     { opacity: '1' }
                        // ], {
                        //     duration: 500,
                        // });
                    }
                    buttons.forEach(function (button) {
                        button.parentElement.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                }

            });
        })

    }()

    // Services Circle
    !function () {
        var activeLink = Array.from(document.querySelectorAll('.service-icon'));
        for (var i = 0; i < activeLink.length; i++) {
            if (activeLink[i].classList.contains('active')) {
                activeLink = activeLink[i];
                break;
            }
        }
        var src = activeLink.children[0].src;
        activeLink.children[0].src = 'assets/images/icons/icon-1-white.png';
    }();

})
// jQuery
$(document).ready(function () {

    // Side Navigation 
    $('a.menu-icon').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('menu-open');
    });

    // Services Slider
    $(".services-items").owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        margin: 25,
        nav: true,
        navText: ['<img src="assets/images/icons/arrow-left.png" />', '<img src="assets/images/icons/arrow-right.png" />'],
    });
    $(".services-items").on('changed.owl.carousel', function (e) {
        setTimeout(function () {
            var activeItem = document.querySelector('.slider-items .owl-item.active');
            var activeIndex = document.querySelector('.slider-items .owl-item.active');
            activeIndex = activeIndex.querySelector('.slider-item');
            activeIndex = activeIndex.dataset.index;

            var serviceCircle = document.querySelector('.service-circle');

            serviceCircle.children[0].style.transform = 'rotate(' + (+activeIndex + 1) * 45 + 'deg)';

            var serviceIcons = document.querySelectorAll('.service-icon');
            for (var i = 0; i < serviceIcons.length; i++) {
                serviceIcons[i].classList.remove('active');
                serviceIcons[i].children[0].src = 'assets/images/icons/icon-' + (i + 1) + '.png'
            }
            serviceIcons[activeIndex].classList.add('active');
            serviceIcons[activeIndex].children[0].src = 'assets/images/icons/icon-' + (+activeIndex + 1) + '-white.png'
            var circleInner = document.querySelector('.circle-inner-text');
            circleInner.querySelector('h3').innerHTML = activeItem.querySelector('h2').innerText;
            circleInner.querySelector('a').href = activeItem.querySelector('a').href;
            circleInner.querySelector('a').innerHTML = activeItem.querySelector('a').innerHTML;
        }, 80)
    });

    // Portfolio Slider
    let portfolioSlider = $("#portfolios .slider-items");
    portfolioSlider.owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],

        responsive: {
            0: {
                stagePadding: 35,
                margin: 5
            },

            576: {
                stagePadding: 40,
                margin: 10
            },
            1200: {
                stagePadding: 75,
                margin: 15,
            }
        }
    });

    !function () {
        var activeItem = document.querySelector('#portfolios .slider-items .owl-item.active');
        activeItem = activeItem.children[0];
        var serviceDOM = document.querySelector('.black-bar .black-bar-left > h3');
        var titleDOM = document.querySelector('.black-bar .black-bar-left > h2');
        var locationDOM = document.querySelector('.black-bar .black-bar-left > p');
        var linkDOM = document.querySelector('.black-bar .black-bar-right > a:first-of-type');
        var extraDOM = document.querySelector('.black-bar .black-bar-right > p');

        var current = 1;
        var total = Math.floor(portfolioSlider[0].querySelectorAll('.slider-item').length / 2);
        total = total < 10 ? '0' + total : total;
        document.querySelector('.current-total-items span:last-child').innerText = total;

        serviceDOM.innerHTML = activeItem.dataset.service;
        titleDOM.innerHTML = activeItem.dataset.title;
        locationDOM.innerHTML = activeItem.dataset.location;
        linkDOM.href = activeItem.dataset.link;
        extraDOM.innerHTML = activeItem.dataset.extra;

        portfolioSlider.on('changed.owl.carousel', function (e) {
            console.log(e.item);
            setTimeout(function () {
                current++;
                if (current > total) {
                    current = 1;
                }
                current = current < 10 ? ('0' + current) : current;
                document.querySelector('.current-total-items span:first-child').innerText = current;

                var activeItem = document.querySelector('#portfolios .slider-items .owl-item.active');
                activeItem = activeItem.children[0];
                var serviceDOM = document.querySelector('.black-bar .black-bar-left > h3');
                var titleDOM = document.querySelector('.black-bar .black-bar-left > h2');
                var locationDOM = document.querySelector('.black-bar .black-bar-left > p');
                var linkDOM = document.querySelector('.black-bar .black-bar-right > a:first-of-type');
                var extraDOM = document.querySelector('.black-bar .black-bar-right > p');

                serviceDOM.innerHTML = activeItem.dataset.service;
                titleDOM.innerHTML = activeItem.dataset.title;
                locationDOM.innerHTML = activeItem.dataset.location;
                linkDOM.href = activeItem.dataset.link;
                extraDOM.innerHTML = activeItem.dataset.extra;
            }, 100);
        });
    }();
    // Scroll Lock Slider
    let scrollLockSlider = $("#scroll-lock .scroll-lock-items");
    scrollLockSlider.owlCarousel({
        items: 1,
        loop: false,
        dots: true,
        nav: false,
        autoplay: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        freeDrag: false,
    });
    var slideItes = scrollLockSlider.find('.owl-item');
    var slideItemCount = (slideItes.length) - 1;
    $("#scroll-lock").on('mousewheel', function (e) {
        if (e.deltaY > 0) {
            scrollLockSlider.trigger('prev.owl');
        } else {
            scrollLockSlider.trigger('next.owl');
        }
        if ((!$(slideItes[slideItemCount]).hasClass('active') || $(slideItes[0]).hasClass('active')) && ($(slideItes[slideItemCount]).hasClass('active') || !$(slideItes[0]).hasClass('active'))) {
            e.preventDefault();
        }
    });


    // Magnific Popup
    $('.discover-primus a.video-play-button').magnificPopup(
        { type: 'iframe' }
    );

});
