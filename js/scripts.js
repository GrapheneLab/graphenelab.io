$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    const ANGLE = 3;
    var cards = document.querySelectorAll(".gl__advantages-item");
    cards.forEach(function (item) {
        floatable(item);
    });

    function floatable(panel) {
        var content = panel.querySelector(".gl__card--advantage");

        panel.addEventListener('mouseout', function () {
            content.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
        });

        panel.addEventListener('mousemove', function (e) {
            var w = panel.clientWidth,
                h = panel.clientHeight,
                y = (e.offsetX - w * 0.5) / w * ANGLE,
                x = (1 - (e.offsetY - h * 0.5)) / h * ANGLE;

            content.style.transform = 'perspective(300px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
        });
    }

    if (window.innerWidth < 1000) {
        var menu = $('.navbar-nav');
        $('.gl__navbar').on('click', function (e) {
            e.preventDefault();
            !menu.hasClass('open')
                ? menu.addClass('open')
                : menu.removeClass('open')
        })
    }

    if ($('#pieces').length > 0) {

        var w = $(window).width(),
            h = $(window).height(),
            totalSection = 3,
            actualSection = 1,
            path1,
            path2,
            section1,
            section2,
            section3;

        function sections() {
            w = $(window).width();
            h = $(window).height();

            section1 = {
                path1: [
                    {x: 0, y: 0},
                    {x: w * 0.2, y: 0},
                    {x: w * 0.7, y: h},
                    {x: 0, y: h}
                ],
                path2: [
                    {x: -w * 0.2, y: h * 0.2},
                    {x: 0, y: 0},
                    {x: w, y: h},
                    {x: 0, y: h}
                ]
            };

            section2 = {
                path1: [
                    {x: w * 0.15, y: 0},
                    {x: w, y: 0},
                    {x: w, y: h},
                    {x: w * 0.65, y: h}
                ],
                path2: [
                    {x: w, y: h * 0.3},
                    {x: w * 2, y: h * 0.3},
                    {x: w, y: h},
                    {x: w * 0.45, y: h}
                ]
            };

            section3 = {
                path1: [
                    {x: w * 0.1, y: 0},
                    {x: w, y: 0},
                    {x: w * 1.1, y: h * 0.7},
                    {x: w, y: h * 0.95}
                ],
                path2: [
                    {x: w * 0.18, y: 0},
                    {x: w, y: 0},
                    {x: w * 0.95, y: h},
                    {x: w * 0.55, y: h}
                ]
            }
        }

        $(window).on('resize', function () {
            morphingPaths(actualSection);
        }).resize();

        function changeBg() {
            actualSection = (actualSection >= totalSection) ? 1 : ++actualSection;
            $('#pieces').removeAttr('class').addClass('section' + actualSection);
            morphingPaths(actualSection);
        }
        function morphingPaths(section) {
            sections();
            var $path1 = $('#path1'),
                $path2 = $('#path2');

            switchToPath($path1, section, 'path1');
            setTimeout(function () {
                switchToPath($path2, section, 'path2');
            }, 200);
        }
        function switchToPath($path, section, sectionPath) {
            var pathPoints = eval('section' + section)[sectionPath];
            var points = '';

            window[sectionPath] = [];
            actualPoints = $path.attr('points').split(' ');

            for (var i = 0; i < pathPoints.length; i++) {
                var actualPoint = actualPoints[i].split(','),
                    obj = {
                        x: actualPoint[0],
                        endX: pathPoints[i].x,
                        y: actualPoint[1],
                        endY: pathPoints[i].y
                    };
                window[sectionPath].push(obj);
            }

            for (var j = 0; j < window[sectionPath].length; j++) {
                var p = window[sectionPath][j];
                TweenMax.to(p, 1, {
                    x: p.endX,
                    y: p.endY,
                    ease: Expo.easeInOut,
                    delay: j * .25,
                    onUpdate: function () {
                        animatePath($path, window[sectionPath]);
                    }
                }, .2);
            }

            function animatePath($path, path) {
                var points = '';
                for (var i = 0; i < path.length; i++) {
                    var point = path[i].x + ',' + path[i].y;
                    points += point + ' ';
                }
                $path.attr('points', points);
            }
        }

        $('.js-change-svg-bg').on('click', function () {
            changeBg()
        });

        setInterval(function () {
            changeBg()
        }, 5000);
    }
});

$('.js-link-anchor').on('click', function () {
    var px = $($(this).attr('href')).offset().top;
    $('html, body').animate({scrollTop: px}, px === 0 ? 1000 : px / 10);
});

//form validation & submit

var validateMail = function(mail){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
};

var validateName = function(mail){
    var notNumbers = /^([^0-9]*)$/;
    var notSymbols = /^[^`~!@#$%^&*()<>%$=+_,.[\]:;<>\\/|]*$/;

    return notNumbers.test(String(mail).toLowerCase()) && notSymbols.test(String(mail).toLowerCase());
};

var validation = function(name, value){

    var result = false;

    switch(name){
        case 'ct_email':
            result = validateMail(value);
            break;
        case 'ct_name':
            result = validateName(value);
            break;
        // case 'ct_message':
        //     result = value.length > 10;
        //     break;
        default:
            result = true;
    }

    return result;
};

var validateField = function(field){

    var name = field.id;
    var value = field.value;
    var valid =  validation(name, value);
    var classesArr = ['field--valid', 'field--invalid'];

    if(!valid){
        classesArr.reverse();
    }

    field.classList.add(classesArr[0]);
    field.classList.remove(classesArr[1]);

    return valid;
};

var performValidation = function(event){
    validateField(event.target);
};

var httpXMLRequest = function(object){

    var btn = document.getElementById('formSubmit');

    btn.innerHTML =
        '<div class="form-loader">'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
        + '</div>';

    btn.disabled = true;

    var xhr = new XMLHttpRequest();
    var url = 'https://utils.graphenelab.io/send.php';
    var data = new FormData();
    var resultText = {
        ru: [
            '<p class="text--lg">Спасибо за обращение!</p>',
            '<p class="text--md">Благодарим Вас за обращение по данному вопросу. <br/> В ближайшее время с Вами свяжется один из наших сотрудников.</p>',
            '<p class="text--md">Удачного дня!!</p>'
        ],
        en: [
            '<p class="text--lg">Thank you for getting in touch!</p>',
            '<p class="text--md">We appreciate you contacting us about the quote. <br/> One of our colleagues will get back to you shortly.</p>',
            '<p class="text--md">Have a great day!!</p>'
        ]
    }

    for(var i in object){
        data.append(i, object[i]);
    }

    xhr.open('POST', url, true);

    xhr.send(data);

    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status != 200) {
            // обработать ошибку
            console.log( 'Error: ' + (this.status ? this.statusText : 'request failed!') );
            btn.innerHTML = 'Send';
            btn.disabled = false;
            return;
        } else {
            var formDOM = document.getElementById('contactForm');
            var locale = 'ru';

            if(window.location.pathname.indexOf('en') > -1){
                locale = 'en'
            }

            formDOM.innerHTML = resultText[locale].join('\n');
        }

    }
};


$('#contactForm').on('submit', function (event) {
    event.preventDefault();

    var fields = Object.values(event.currentTarget).slice(0, event.currentTarget.length - 1);

    var errors = false;
    var object = {};

    for(var i = 0; i < fields.length; i++){
        var elem = fields[i];
        var valide = validateField(elem, true);

        if(!valide || !elem.value){
            errors = true;
            break;
        }

        object[elem.id] = elem.value;
    }

    if(!errors){
        // console.log(object);
        httpXMLRequest(object);
        return;
    }

});
