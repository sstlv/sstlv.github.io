

(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: ''   // mailchimp url
    },
            $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var clPreloader = function () {

        $("html").addClass('ss-preload');

        $WIN.on('load', function () {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function () {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

        });
    };


    /* pretty print
     * -------------------------------------------------- */
    var clPrettyPrint = function () {
        $('pre').addClass('prettyprint');
        $(document).ready(function () {
            prettyPrint();
        });
    };


    /* search
     * ------------------------------------------------------ */
    var clSearch = function () {

        var searchWrap = $('.header__search'),
                searchField = searchWrap.find('.search-field'),
                closeSearch = searchWrap.find('.header__overlay-close'),
                searchTrigger = $('.header__search-trigger'),
                siteBody = $('body');


        searchTrigger.on('click', function (e) {

            e.preventDefault();
            e.stopPropagation();

            var $this = $(this);

            siteBody.addClass('search-is-visible');
            setTimeout(function () {
                searchWrap.find('.search-field').focus();
            }, 100);

        });

        closeSearch.on('click', function (e) {

            var $this = $(this);

            e.stopPropagation();

            if (siteBody.hasClass('search-is-visible')) {
                siteBody.removeClass('search-is-visible');
                setTimeout(function () {
                    searchWrap.find('.search-field').blur();
                }, 100);
            }
        });

        searchWrap.on('click', function (e) {
            if (!$(e.target).is('.search-field')) {
                closeSearch.trigger('click');
            }
        });

        searchField.on('click', function (e) {
            e.stopPropagation();
        });

        searchField.attr({placeholder: 'Type Keywords', autocomplete: 'off'});

    };


    /* Mobile Menu
     * ---------------------------------------------------- */
    var clMobileMenu = function () {

        var navWrap = $('.header__nav-wrap'),
                closeNavWrap = navWrap.find('.header__overlay-close'),
                menuToggle = $('.header__toggle-menu'),
                siteBody = $('body');

        menuToggle.on('click', function (e) {
            var $this = $(this);

            e.preventDefault();
            e.stopPropagation();
            siteBody.addClass('nav-wrap-is-visible');
        });

        closeNavWrap.on('click', function (e) {

            var $this = $(this);

            e.preventDefault();
            e.stopPropagation();

            if (siteBody.hasClass('nav-wrap-is-visible')) {
                siteBody.removeClass('nav-wrap-is-visible');
            }
        });

        // open (or close) submenu items in mobile view menu. 
        // close all the other open submenu items.
        $('.header__nav .has-children').children('a').on('click', function (e) {
            e.preventDefault();

            if ($(".close-mobile-menu").is(":visible") == true) {

                $(this).toggleClass('sub-menu-is-open')
                        .next('ul')
                        .slideToggle(200)
                        .end()
                        .parent('.has-children')
                        .siblings('.has-children')
                        .children('a')
                        .removeClass('sub-menu-is-open')
                        .next('ul')
                        .slideUp(200);

            }
        });
    };


    /* slick slider
     * ------------------------------------------------------ */
    var clSlickSlider = function () {

        $('.featured-slider').slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '10%',
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        arrows: false,
                        centerPadding: '8%'
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        arrows: false,
                        centerPadding: '5%'
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        centerMode: false
                    }
                }
            ]
        });
    };


    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var clSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                    $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


    /* Alert Boxes
     * ------------------------------------------------------ */
    var clAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Animate On Scroll
     * ------------------------------------------------------ */
    var clAOS = function () {

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


    /* AjaxChimp
     * ------------------------------------------------------ */
    var clAjaxChimp = function () {

    };


    /* Back to Top
     * ------------------------------------------------------ */
    var clBackToTop = function () {

        var pxShow = 500,
                goTopButton = $(".go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow)
            goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                if (!goTopButton.hasClass('link-is-visible'))
                    goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };


    /* Map
     * ------------------------------------------------------ */

    // add custom buttons for the zoom-in/zoom-out on the map
    var clCustomZoomControl = function (controlDiv, map) {

        // grap the zoom elements from the DOM and insert them in the map 
        var controlUIzoomIn = document.getElementById('map-zoom-in'),
                controlUIzoomOut = document.getElementById('map-zoom-out');

        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
            map.setZoom(map.getZoom() - 1)
        });

    };


    /* Initialize
     * ------------------------------------------------------ */
    (function clInit() {

        clPreloader();
        clPrettyPrint();
        clSearch();
        clMobileMenu();
        clSlickSlider();
        clSmoothScroll();
        clAlertBoxes();
        clAOS();
        clAjaxChimp();
        clBackToTop();
        clGoogleMap();

    })();

})(jQuery);