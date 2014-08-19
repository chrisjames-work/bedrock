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


    $('a.video-play').attr('role', 'button').on('click', function(e) {
        e.preventDefault();

        var $this = $(this);
        var videoelem = $('#' + $this.attr('data-element-id'));

        Mozilla.Modal.createModal(this, videoelem, {
          title: $this.attr('data-title'),
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

    $('#inquiry-form .info').on('click', function(e) {
        e.preventDefault();

        var $this = $(this);
        var elem = $(this).attr("href").replace( /.*?(#.*)/g, "$1" );// Extract the target element's ID from the link's href.

        Mozilla.Modal.createModal(this, $('.category-info'), {
          title: $('.category-info h2').text(),
        });
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

})(window.jQuery);
