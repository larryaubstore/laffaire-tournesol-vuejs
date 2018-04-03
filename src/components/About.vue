<template>






    <div class="about">

        <div class="offset" />

        <div class="text fixed">
            <div class="title">Bachibouzouk</div>
            <div class="subtitle">La force des relations</div>
        </div>



        <div class="first_blank"></div>


        <div class="middle_spacer">
            <div class="synopsis">Pouvoir déduire les liens d'un sujet et pouvoir chiffrer leur importance, 
                telle est la mission de <i>Bachibouzouk</i>. Par exemple, prenons un personnage politique, nous voudrions
                parcourir l'ensemble de ses connaissances et pouvoir coter chacune d'elle selon son importance dans le cercle des
                relations de notre sujet. 
            </div>
        </div>


        <div class="second_blank" style="height: 300px"></div>


        <div class="abraham">
        
            <div class="image" />
            <div class="subject">Abraham</div>
            <div class="subtitle">Le sujet</div>
        
        </div>


        <div class="abraham_offset" style="height: 300px" />

        <div class="links">

            <div class="subject">Ses liens</div>
            <div class="sublinks">
                La guerre de sécession <b>(500 points)</b> <br />
                Esclavage <b>(300 points)</b> <br />
                Mary Todd <b>(100 points)</b> <br />
            </div>


        </div>




        <div class="techno_offset" />

        <div class="hadoop"> </div>


        <div class="giraph"> </div>


       


    </div>

</template>


<script>

    import * as debug       from 'debug';

    const log = debug('about');

    log('About');

    var isLayout = false;
    var isSecondElementFixed = false;

    function onScroll(event) {

        
        let positionMiddleSpacer = getMiddleSpacerElement().getBoundingClientRect().top;

        let positionAbraham = getAbrahamElement().getBoundingClientRect().top;

        let scrollY = window.scrollY;


        let textHeight = getTextElement().offsetHeight;

        let middleSpacerHeight = getMiddleSpacerHeight();
        let topTwoElementHeight = middleSpacerHeight + textHeight;
        let topThreeElement = middleSpacerHeight + textHeight + getAbrahamHeight();


        //log(scrollY);
        

        if (isLayout === false) {
            if(positionAbraham <= topTwoElementHeight) {
                isLayout = true;
                document.getElementsByClassName('offset')[0].style.height = window.scrollY + 'px';
                document.getElementsByClassName('first_blank')[0].style.height = '0px';
                document.getElementsByClassName('second_blank')[0].style.height = '0px';

                removeClass(getAbrahamElement(), "fixed");
                removeClass(getMiddleSpacerElement(), "fixed");
                removeClass(getTextElement(), "fixed");


            } else { 
                if (positionMiddleSpacer > textHeight) {
                    //removeClass(getMiddleSpacerElement(), "fixed");

                } else {



                    if (isSecondElementFixed === false) {
                        isSecondElementFixed = true;
                        let originalHeight = document.getElementsByClassName('first_blank')[0].offsetHeight;

                        log('original => ' + originalHeight);
                        log('middle   => ' + getMiddleSpacerHeight());


                        document.getElementsByClassName('first_blank')[0].style.height = parseInt(originalHeight + getMiddleSpacerHeight()) + 'px';

                        log('final  => ' + document.getElementsByClassName('first_blank')[0].offsetHeight);

                        addClass(getMiddleSpacerElement(), "fixed");
                    }

                    
                }


                if (positionAbraham > topTwoElementHeight) {
                    //removeClass(getAbrahamElement(), "fixed");
                } else {
                    addClass(getAbrahamElement(), "fixed");
                }
            }
        }
        


    }


    function getMiddleSpacerHeight()  {
        let height = getMiddleSpacerElement().offsetHeight;
        return height;
    }

    function getMiddleSpacerElement() {
        let middle_spacer = document.getElementsByClassName('middle_spacer')[0];
        return middle_spacer;
    }

    function getAbrahamElement() {
        let abrahamElement = document.getElementsByClassName('abraham')[0];
        return abrahamElement;
    }

    function getAbrahamHeight() {
        let height = getAbrahamElement().offsetHeight;
        return height;
    }

    function getTextElement() {
        let textElement = document.getElementsByClassName('text')[0];
        return textElement;
    }

    function toggle(element, className) {

        if (element.classList) { 
            element.classList.toggle(className);
        } else {
            // For IE9
            var classes = element.className.split(" ");
            var i = classes.indexOf(className);

            if (i >= 0) 
                classes.splice(i, 1);
            else 
                classes.push(className);
                element.className = classes.join(" "); 
        }        
    }

    function removeClass(element, className) {
        let re = new RegExp(className, "g");
        element.className = element.className.replace(re, "");
    }

    function addClass(element, className) {
        var name, arr;
        name = className;
        arr = element.className.split(" ");
        if (arr.indexOf(name) == -1) {
            element.className += " " + name;
        }        
    }


    function resize(event) {



        let windowWidth = window.innerWidth ;

        if (window.innerWidth <= 640) {
            document.body.style.overflow = "scroll";
            // Problème bizarre sur Pixel 2
            document.body.style.backgroundSize = windowWidth + 100 + 'px';    
        } else {
            document.body.style.overflow = "scroll";
        }


        if (windowWidth > 960) {
            windowWidth = 960;
        }

        getTextElement().style.width = windowWidth + 'px' ;
        getMiddleSpacerElement().style.width = windowWidth + 'px';
        document.getElementsByClassName('subject')[0].style.width = parseInt(windowWidth * 0.65) + 'px';

        document.getElementsByClassName('subtitle')[0].style.width = windowWidth + 'px';
        document.getElementsByClassName('subtitle')[1].style.width = parseInt(windowWidth * 0.65) + 'px';

        document.getElementsByClassName('sublinks')[0].style.width = parseInt(windowWidth * 0.85) + 'px';
        document.getElementsByClassName('synopsis')[0].style.width = parseInt(windowWidth * 0.70) + 'px';


        document.getElementsByClassName('title')[0].style.width = windowWidth + 'px';

        document.getElementsByClassName('hadoop')[0].style.width = windowWidth + 'px';

        document.getElementsByClassName('links')[0].style.width = windowWidth + 'px';

        document.getElementsByClassName('image')[0].style.width = parseInt(windowWidth * 0.30) + 'px';


        getAbrahamElement().style.width = windowWidth + 'px';

        
    }

    export default {
        name: 'About',
        mounted: function () {

            log('mounted');


            window.addEventListener('scroll', onScroll);

            let textElement = document.getElementsByClassName('text')[0];
            textElement.addEventListener('click', () => {
                toggle(getMiddleSpacerElement(), 'fixed');
            });

            window.addEventListener('resize', resize);

            resize();




            
        }
    }


</script>

<style>





@media (min-width: 641px)  {
    body {
        background: url('../assets/apropos.png') no-repeat fixed;
        margin: 0;
        padding: 0;
        overflow: scroll;
        background-position: top center;
    }


    .about .first_blank {
        height: 300px;
    }


    .about .text {
        width: 960px;
        height: 125px;
        margin: 0 auto;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
    }


    .about .text.fixed {
        width: 960px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
        position: fixed;
        top: 0px;
        left: 50%;
        margin-left: -480px
    }

    .about .text .title {
        font-size:60px;
        font-weight: bold;
    }

    .about .text .subtitle {
        width: 400px;
        margin: 0 auto;
        text-align: center;
        font-size: 30px;
    }

    .about .middle_spacer {
        width: 960px;
        margin: 0 auto;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
    }


    .about .middle_spacer.fixed {
        width: 960px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
        position: fixed;
        left: 50%;
        margin-left: -480px;
        top: 125px;
    }

    .about .middle_spacer .synopsis {
        width: 500px;
        margin: 0 auto;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 20px;
    }


    .about .title {
        width: 500px;
        margin: 0 auto;
        text-align: center;
        padding-top: 10px;
    }

    .about .inner {
        width: 960px;
        height:1600px;
    }

    .about .hadoop {
        width: 960px;
        height: 500px;
        background-image: url('../assets/hadoop.png');
        margin: 0 auto;
        background-position: -450px;
    }

    .about .abraham {
        margin: 0 auto;     
        width: 960px;
        height: 414px;
    }

    .about .abraham.fixed {
        position: fixed;
        left: 50%;
        margin-left: -480px;
        top: 300px;

    }

    .about .abraham .image {
        background-image: url('../assets/abraham.jpg');
        width: 330px;
        height: 414px;
        float: left;  
        background-size: cover;
    }

    .about .abraham .subject {
        float: right;
        width: 630px;
        font-size: 120px;
        font-weight: bold;
        text-align: center;
    }

    .about .abraham .subtitle {
        font-size:40px;
        font-weight: normal;
        float: right;
        width: 630px;
        text-align: center;
    }



    .about .giraph {
        width: 960px;
        height: 500px;
        background-image: url('../assets/giraph.png');
        margin: 0 auto;
        background-position: 0 -600px;
    }


    .about .techno_offset {
        height: 0px;
    }


    .about .links {
        width: 960px;
        margin: 0 auto;
        height: 400px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;

    }

    .about .links .subject {
        width: 630px;
        font-size: 120px;
        font-weight: bold;
        text-align: center;
        float: left;
        clear:both;
    }

    .about .sublinks {
        font-size: 50px;
        width: 830px;
        font-weight: normal;
        text-align: left;
        float: right;
    }

}

@media (min-width: 481px) and (max-width: 640px) {
    body {
        background: url('../assets/apropos.jpg') no-repeat fixed;
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 640px;
        background-position: top center;
    }

    .about .first_blank {
        height: 300px;
    }


    .about .text {
        width: 640px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
    }


    .about .text.fixed {
        width: 640px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
        position: fixed;
        top: 0px;
    }

    .about .text .title {
        font-size:60px;
        font-weight: bold;
    }

    .about .text .subtitle {
        width: 640px;
        text-align: center;
        font-size: 30px;
    }

    .about .middle_spacer {
        width: 640px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
    }


    .about .middle_spacer.fixed {
        width: 640px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
        position: fixed;
        top: 125px;
    }

    .about .middle_spacer .synopsis {
        width: 640px;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 20px;
        margin: 0 auto;
    }


    .about .title {
        width: 640px;
        text-align: center;
        padding-top: 10px;
    }

    .about .inner {
        width: 640px;
        height:1600px;
    }

    .about .hadoop {
        width: 640px;
        height: 500px;
        background-image: url('../assets/hadoop.png');
        background-position: -450px;       
    }

    .about .abraham {
        width: 640px;
        height: 414px;
    }

    .about .abraham.fixed {
        position: fixed;
        top: 300px;
        width: 640px;

    }

    .about .abraham .image {
        background-image: url('../assets/abraham.jpg');
        width: 165px;
        height: 207px;
        float: left;  
        background-size: cover;
    }

    .about .abraham .subject {
        float: right;
        width: 400px;
        font-size: 60px;
        font-weight: bold;
        text-align: center;
    }

    .about .abraham .subtitle {
        font-size:40px;
        font-weight: normal;
        float: right;
        width: 400px;
        text-align: center;
    }



    .about .giraph {
        width: 640px;
        height: 500px;
        background-image: url('../assets/giraph.png');
        margin: 0 auto;
        background-position: 0 -600px;
    }


    .about .techno_offset {
        height: 0px;
    }


    .about .links {
        width: 640px;
        height: 200px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;

    }

    .about .links .subject {
        width: 400px;
        font-size: 60px;
        font-weight: bold;
        text-align: center;
        float: left;
        clear:both;
    }

    .about .sublinks {
        font-size: 30px;
        width: 550px;
        font-weight: normal;
        text-align: left;
        float: right;
    }


}



@media (min-width: 321px) and (max-width: 480px) {
    body {
        background: url('../assets/apropos.jpg') no-repeat fixed;
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 480px;
        background-position: top center;
    }

    .about .first_blank {
        height: 300px;
    }


    .about .text {
        width: 480px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
    }


    .about .text.fixed {
        width: 480px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
        position: fixed;
        top: 0px;
    }

    .about .text .title {
        font-size:60px;
        font-weight: bold;
    }

    .about .text .subtitle {
        width: 480px;
        text-align: center;
        font-size: 30px;
    }

    .about .middle_spacer {
        width: 480px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
    }


    .about .middle_spacer.fixed {
        width: 480px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
        position: fixed;
        top: 125px;
    }

    .about .middle_spacer .synopsis {
        width: 400px;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 20px;
        margin: 0 auto;
    }


    .about .title {
        width: 480px;
        text-align: center;
        padding-top: 10px;
    }

    .about .inner {
        width: 480px;
        height:1600px;
    }

    .about .hadoop {
        width: 480px;
        height: 500px;
        background-image: url('../assets/hadoop.png');
        margin: 0 auto;
        background-position: -450px;        
    }

    .about .abraham {
        width: 480px;
        height: 414px;
    }

    .about .abraham.fixed {
        position: fixed;
        top: 300px;
        width: 480px;

    }

    .about .abraham .image {
        background-image: url('../assets/abraham.jpg');
        width: 165px;
        height: 207px;
        float: left;  
        background-size: cover;
    }

    .about .abraham .subject {
        float: right;
        width: 300px;
        font-size: 60px;
        font-weight: bold;
        text-align: center;
    }

    .about .abraham .subtitle {
        font-size: 40px;
        font-weight: normal;
        float: right;
        width: 300px;
        text-align: center;
    }



    .about .giraph {
        width: 480px;
        height: 500px;
        background-image: url('../assets/giraph.png');
        background-position: 0 -600px;
    }


    .about .techno_offset {
        height: 0px;
    }

    .about .links {
        width: 480px;
        height: 200px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;

    }

    .about .links .subject {
        width: 250px;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        float: left;
        clear:both;
        padding-top: 30px;
    }

    .about .sublinks {
        font-size: 20px;
        width: 350px;
        font-weight: normal;
        text-align: left;
        float: right;
    }
    

}


@media (max-width: 320px) {
    body {
        background: url('../assets/apropos.jpg') no-repeat fixed;
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 320px;
        background-position: top center;
    }

    .about .first_blank {
        height: 300px;
    }


    .about .text {
        width: 320px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
    }


    .about .text.fixed {
        width: 320px;
        height: 125px;
        background-image: url('../assets/fond_gris_fonce.png');
        background-repeat: repeat;
        position: fixed;
        top: 0px;
    }

    .about .text .title {
        font-size:40px;
        font-weight: bold;
    }

    .about .text .subtitle {
        width: 320px;
        text-align: center;
        font-size: 30px;
    }

    .about .middle_spacer {
        width: 320px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
    }


    .about .middle_spacer.fixed {
        width: 320px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
        position: fixed;
        top: 125px;
    }

    .about .middle_spacer .synopsis {
        width: 280px;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 20px;
        margin: 0 auto;
    }


    .about .title {
        width: 320px;
        text-align: center;
        padding-top: 10px;
    }

    .about .inner {
        width: 320px;
        height:1600px;
    }

    .about .hadoop {
        width: 320px;
        height: 500px;
        background-image: url('../assets/hadoop.png');
        margin: 0 auto;
        background-position: -450px;        
    }

    .about .abraham {
        width: 320px;
        height: 414px;
    }

    .about .abraham.fixed {
        position: fixed;
        top: 300px;
        width: 320px;

    }

    .about .abraham .image {
        background-image: url('../assets/abraham.jpg');
        width: 100px;
        height: 140px;
        float: left;  
        background-size: cover;
    }

    .about .abraham .subject {
        float: right;
        width: 200px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
    }

    .about .abraham .subtitle {
        font-size: 30px;
        font-weight: normal;
        float: right;
        width: 200px;
        text-align: center;
    }



    .about .giraph {
        width: 320px;
        height: 500px;
        background-image: url('../assets/giraph.png');
        background-position: 0 -600px;
    }


    .about .techno_offset {
        height: 0px;
    }

    .about .links {
        width: 320px;
        margin: 0 auto;
        height: 200px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;

    }

    .about .links .subject {
        width: 150px;
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        float: left;
        clear:both;
    }

    .about .sublinks {
        font-size: 20px;
        width: 275px;
        font-weight: normal;
        text-align: left;
        float: right;
    }


}









</style>
