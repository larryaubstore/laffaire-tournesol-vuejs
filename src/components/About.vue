<template>






    <div class="about">

        <div class="offset" />

        <div class="text fixed">
            <div id='top1000' class="menu">Top 1000</div>
            <div class="title">Bachibouzouk</div>
            <div class="subtitle">La force des relations</div>
        </div>


        <div id="presentation">

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

       


    </div>

</template>


<script>

    import * as debug       from 'debug';

    const log = debug('about');

    log('About');










    export default {
        name: 'About',
          props: {
            hideBackground: Boolean,
        },
        mounted: function () {
            log('mounted');
            document.body.style.overflow = "scroll";

            if (this.hideBackground === "true") {
                document.body.style.backgroundImage = "none";
                document.getElementById('presentation').style.display = "none";
            }
            // 
            document.getElementById('top1000').addEventListener('click', () => {
                window.location = '/top1000';
            });
        }
    }
</script>

<style>



    body {
        background: url('../assets/apropos.jpg') no-repeat fixed;
        margin: 0;
        padding: 0;
        overflow: scroll;
        background-position: top center;
    }

    .about {
        z-index: 1;
    }


    .about .first_blank {
        height: 300px;
    }


    .about .text .menu {

        position: absolute;
        left: 15px;
        background-color: #60dcaf;
        padding: 8px;
        margin-top: 7px;
        font-weight: bold;
        cursor: pointer;
    }

    .about .text .menu:hover {
        background-color: #3b9a78;
    }


    .about .text.fixed {
        height: 90px;
        background-color: #c7f9cc;
        position: fixed;
        top: 0px;
        width: 100%;
        overflow:hidden;
    }

    .about .text .title {
        font-size:40px;
        font-weight: bold;
        height: 50px;
    }

    .about .text .subtitle {
        margin: 0 auto;
        text-align: center;
        font-size: 30px;
        background-color: lightgray;
        height: 40px;
    }

    .about .middle_spacer {
        width: 100%;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
    }

    .about .middle_spacer .synopsis {
        margin: 0 auto;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 20px;
        width: 75%;
    }


    .about .title {
        margin: 0 auto;
        text-align: center;
    }

    .about .inner {
        height:1600px;
    }

    .about .hadoop {
        height: 500px;
        background-image: url('../assets/hadoop.png');
        margin: 0 auto;
        background-repeat: no-repeat;
    }

    .about .abraham {
        width: 100%;
        height: 414px;
        overflow: hidden;
    }


    .about .abraham .image {
        background-image: url('../assets/abraham.jpg');
        height: 414px;
        float: left;  
        background-size: contain;
        background-repeat: no-repeat;
        width: 25%;
    }

    .about .abraham .subject {
        float: right;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        width: 75%;
    }

    .about .abraham .subtitle {
        font-size:40px;
        font-weight: normal;
        float: right;
        text-align: center;
        width: 75%;
    }



    .about .giraph {
        height: 500px;
        background-image: url('../assets/giraph.png');
        margin: 0 auto;
        background-position: 0 -600px;
    }


    .about .techno_offset {
        height: 0px;
    }


    .about .links {
        margin: 0 auto;
        height: 230px;
        background-image: url('../assets/fondgris.png');
        background-repeat: repeat;
        width: 100%;

    }

    .about .links .subject {
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        float: left;
        clear:both;
        width: 100%;
        padding-top: 30px;
    }

    .about .sublinks {
        font-size: 20px;
        font-weight: normal;
        text-align: right;
        float: right;
        padding-top: 30px;
        padding-right:20px;
    }

    @media only screen and (min-width: 1024px) {

        body {
            background: url('../assets/apropos.png') no-repeat fixed;
            margin: 0;
            padding: 0;
            overflow: scroll;
            background-position: top center;
        }




        .about .middle_spacer {
            width: 960px;
            background-image: url('../assets/fondgris.png');
            background-repeat: repeat;
            margin: 0 auto;
        }

        .about .abraham {
            width: 960px;
            height: 414px;
            margin: 0 auto;

        }

        .about .abraham .image {
            background-image: url('../assets/abraham.jpg');
            height: 100%;
            width: 25%;
            float: left;  
            background-size: contain;
            background-repeat: no-repeat;
        }

        .about .abraham .subject {
            float: right;
            font-size: 120px;
            font-weight: bold;
            text-align: center;
            width: 75%;
        }

        .about .abraham .subtitle {
            font-size:40px;
            font-weight: normal;
            float: right;
            text-align: center;
            width: 75%;
        }

        .about .links {
            margin: 0 auto;
            height: 400px;
            background-image: url('../assets/fondgris.png');
            background-repeat: repeat;
            width: 960px;

        }

        .about .links .subject {
            font-size: 120px;
            font-weight: bold;
            text-align: center;
            float: left;
            clear: both;
            width: 600px;
        }

        .about .giraph {
            height: 500px;
            background-image: url('../assets/giraph.png');
            margin: 0 auto;
            background-position: 0 -600px;
            background-repeat: no-repeat;
            width: 960px;
        }


        




    }
    

</style>
