// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    var previousHash = '';

    $('.page-scroll a').on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '' && this.hash !== '#contacts') {
            event.preventDefault();

            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).first().offset().top
            }, 1250, function(){
                window.location.hash = hash;
            });

            console.log(previousHash);
            if (previousHash !== ''){
                $('li + .page-scroll a[href="' + previousHash + '"]').css('background-color', '#313647');
                // $('.page-scroll a[href="' + previousHash + '"]').parent().removeClass('active');
                $('li + .page-scroll a[href="' + hash + '"]').css('background-color', 'red');
            }

            previousHash = hash;
        }
    });

    $('.page-scroll a[href="#contacts"]').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $('body').height()
        }, 1250, '');

        $('.page-scroll a').css('background-color', '#313647');

    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 270
        }
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

})(jQuery); // End of use strict
