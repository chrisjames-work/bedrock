/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

;(function($) {
    'use strict';

    $('#inquiry-form .option input:checked').parents('label').addClass('selected');

    $('#inquiry-form .option input').on('change', function() {
        $('#inquiry-form .option label').removeClass('selected');
        $(this).parents('label').addClass('selected');
    });

    // Disable placeholder links for prototyping
    $('a[href="#"]').on('click', function(e) {
        return false;
    });

    $('.cta-other a').on('click', function() {
        $('#other').slideDown();
    });

    $('.more-toggle a').on('click', function() {
       $('.story-more').slideToggle('fast', function() {
            if ($('.story-more').is(':visible')) {
                $('.more-toggle a').addClass('open').text('Less');
            } else {
                $('.more-toggle a').removeClass('open').text('More');
            }
       });
    });

    $('a.video-play').attr('role', 'button').on('click', function(e) {
        e.preventDefault();

        var $this = $(this);
        var videoelem = $('#' + $this.attr('data-element-id'));

        Mozilla.Modal.createModal(this, videoelem, {
            title: '',
            onCreate: function() {
                play_video();
            }
        });
    });

    var play_video = function() {
        // give the modal a chance to open before playing
        setTimeout(function() {
            $('#modal video:first')[0].play();
        }, 400);
    };



    var ltr = document.dir === 'ltr';

    // Set up the modal navigation
    var modal_paging = function(direction) {
        // get the current blurb
        var $current = $('.info-content:visible');
        var action;

        if (direction === 1) {
            action = 'modal next';
            // Fade out the current blurb
            $current.fadeOut('fast', function(){
                // Get the next blurb and fade it in; it becomes the new current blurb.
                $current = $current.next('.info-content').length ? $current.next('.info-content').fadeIn() : $current.siblings('.info-content:first').fadeIn();
                // Reset the nav
                $('.category-nav .current').removeClass('current');
                // Highlight the new current blurb's icon
                $('.category-nav a[href="#' + $current.attr('id') + '"]').addClass('current');
            });
        } else {
            action = 'modal prev';
            // Fade out the current blurb
            $current.fadeOut('fast', function(){
                // Get the previous blurb and fade it in; it becomes the new current blurb.
                $current = $current.prev('.info-content').length ? $current.prev('.info-content').fadeIn() : $current.siblings('.info-content:last').fadeIn();
                // Reset the nav
                $('.category-nav .current').removeClass('current');
                // Highlight the new current blurb's icon
                $('.category-nav a[href="#' + $current.attr('id') + '"]').addClass('current');
            });
        }
    };

    // Set up the modal
    $('#inquiry-form .info').on('click', function(e) {
        e.preventDefault();

        var $this = $(this);
        var target = $(this).attr('href').replace( /.*?(#.*)/g, "$1" );// Extract the target element's ID from the link's href.

        Mozilla.Modal.createModal(this, $('.category-info'), {
            title: $('.category-info h2').text(),
            'onCreate': function () {
                // Hide all blurbs to reset
                $('.info-content').hide();
                // Show the target blurb
                $(target).show();

                // Reset the nav
                $('.category-nav .current').removeClass('current');
                // Highlight the target blurb's icon
                $('.category-nav a[href="' + target + '"]').addClass('current');

                // Add the prev/next buttons
                var $paging = $('<nav class="modal-nav" role="presentation"></nav>').insertBefore('#modal-close');
                $('<button class="button-prev" aria-controls="modal"></button>')
                    .text(window.trans('global-previous')).appendTo($paging);
                $('<button class="button-next" aria-controls="modal"></button>')
                    .text(window.trans('global-next')).appendTo($paging);

                $paging.on('click', 'button', function() {
                    modal_paging($(this).hasClass('button-prev') ? -1 : 1);
                });
            }
        });
    });

    $('.category-nav a').on('click', function(e){
        e.preventDefault();

        // get the current blurb
        var $current = $('.info-content:visible');

        var $this = $(this);
        var target = $(this).attr('href').replace( /.*?(#.*)/g, "$1" );// Extract the target element's ID from the link's href.

        // Hide all blurbs to reset
        $current.fadeOut('fast', function(){
            // Show the target blurb
            $(target).fadeIn();
        });

        // Reset the nav
        $('.category-nav a').removeClass('current');
        // Highlight the new current blurb's icon
        $this.addClass('current');
    });

    // Set up keyboard shortcuts for the modal
    $(document).on('keydown', '#modal', function(event) {
        var direction = 0;

        switch (event.keyCode) {
            case 37: // Left arrow
                direction = ltr ? -1 : 1;
                break;
            case 38: // Up arrow
                direction = -1;
                break;
            case 39: // Right arrow
                direction = ltr ? 1 : -1;
                break;
            case 40: // Down arrow
                direction = 1;
                break;
        }

        if (direction) {
            event.preventDefault();
            nav_modal(direction);
        }
    });



})(window.jQuery);
