/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    var $promos = $('.promo-grid');
    var $promoSideGrid = $('.promo-side-grid');

    function initFirefoxDownloadPromo() {
        var $downloadPromo = $('.firefox-download');
        var $downloadButtonLinks = $('.firefox-download .download-other-desktop').detach();

        $downloadPromo.on('mouseenter focusin', function () {
            $downloadPromo.addClass('show');
        });

        $downloadPromo.on('mouseleave focusout', function () {
            $downloadPromo.removeClass('show');
        });

        $downloadButtonLinks.css('display', 'block').appendTo('.firefox-download .secondary');
    }

    initFirefoxDownloadPromo();

    function initPromoHoverOver() {
        var $promoLargeLandscape = $('.promo-large-landscape, .promo-large-portrait');
        var showTimeout;

        $promoLargeLandscape.on('mousemove', function(e) {
            var $this = $(this);
            if (!$promos.hasClass('scroll') && !$this.hasClass('show')) {
                $this.addClass('show');
            }
        });

        $promoLargeLandscape.on('focusin', function() {
            $(this).addClass('show');
        });

        $promoLargeLandscape.on('mouseleave focusout', function() {
            $(this).removeClass('show');
        });

        $(window).on('scroll', function() {
            clearTimeout(showTimeout);
            if (!$promos.hasClass('scroll')) {
                $promos.addClass('scroll');
            }

            showTimeout = setTimeout(function () {
                $promos.removeClass('scroll');
            }, 200);
        });
    }

    function showVoicesCategory() {
        var $voices = $('#mozilla-voices');
        var $button = $(this);
        var id = $button.attr('aria-controls');
        var $target = $('#' + id);

        if ($target.length > 0 && !$target.hasClass('selected')) {
            $voices.find('.voices-container.selected').removeClass('selected');
            $voices.find('button.selected').removeClass('selected');
            $target.addClass('selected');
            $button.addClass('selected');
        }
    }

    function showVoicesArticle(e) {
        e.preventDefault();

        var $headline = $(this);
        var $headlineList = $headline.closest('.headlines');
        var id = $headline.attr('aria-controls');
        var $target = $('#' + id);

        if ($target.length > 0 && !$target.hasClass('selected')) {
            $headlineList.find('li .selected').removeClass('selected').attr('aria-selected', false);
            $headline.addClass('selected').attr('aria-selected', true);
            $target.siblings('.selected').removeClass('selected').attr('aria-hidden', true);
            $target.addClass('selected').attr('aria-hidden', false);
        }
    }

    function initVoicesModule() {
        var $voices = $('#mozilla-voices');
        var $buttons = $voices.find('button');
        var $voicesContainer = $voices.find('.voices-container');

        $voicesContainer.each(function() {
            var $voice = $(this);
            var $headlineLists = $voice.find('.headlines');
            var $headlines = $headlineLists.find('a');
            var $articles = $voice.find('.article-container article');

            $headlineLists.attr('role', 'tablist');

            $headlines.attr('role', 'tab');
            $headlines.first().addClass('selected').attr('aria-selected', true);
            $headlines.siblings(':first').attr('aria-selected', false);

            $articles.attr('role', 'tabpanel');
            $articles.first().addClass('selected').attr('aria-hidden', false);
            $articles.siblings(':first').attr('aria-hidden', true);

            $headlines.on('click', showVoicesArticle);
        });

        $buttons.on('click', showVoicesCategory);
    }

    function showFaces(show) {
        if (show) {
            $promos.find('.promo-face, .promo-spacer').show().addClass('item');
        } else {
            $promos.find('.promo-face, .promo-spacer').hide().removeClass('item');
        }
        $promos.masonry();
        $promos.addClass('show-promos');
    }

    function initFacesGrid() {
        if (window.matchMedia) {
            // hide/disable pagers in mobile view
            var queryIsMobile = matchMedia('(max-width: 660px)');

            if (!queryIsMobile.matches) {
                showFaces(true);
            } else {
                showFaces(false);
            }

            queryIsMobile.addListener(function(mq) {
                if (mq.matches) {
                    showFaces(false);
                } else {
                    showFaces(true);
                }
            });
        } else {
            showFaces(true);
        }
    }

    function initMasonry() {

        // make sure the Firefox download promo always appears in the thirst row
        $('.firefox-download').addClass('stamp');

        $('.promo-grid').masonry({
            columnWidth: 140,
            gutter: 20,
            itemSelector: '.item',
            stamp: '.stamp',
            isInitLayout: false
        });
    }

    function noScroll() {
        window.scrollTo(0, 0);
    }

    function initWelcomeOverlay() {
        var $window = $(window);
        var $body = $('body');

        if ($window.scrollTop() > 0) {
            $window.scrollTop(0);
        }

        $window.on('scroll.intro', noScroll);

        setTimeout(function () {
            $body.addClass('welcome');

            setTimeout(function () {
                $('#welcome-overlay').addClass('out');

                setTimeout(function () {
                    $body.removeClass('welcome');
                    $window.off('scroll.intro', noScroll);
                }, 1500);
            }, 500);
        }, 50);
    }

    initMasonry();
    initFacesGrid();
    initPromoHoverOver();
    initVoicesModule();

    //initWelcomeOverlay();
});
