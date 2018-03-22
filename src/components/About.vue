<template>






    <div class="about">

        <div class="text">
            <div class="title">Bachibouzouk</div>
            <div class="subtitle">La force des relations</div>
        </div>





        <div class="middle_spacer">
            <div class="synopsis">Pouvoir déduire les liens d'un sujet et pouvoir chiffrer leur importance, 
                telle est la mission de <i>Bachibouzouk</i>. Par exemple, prenons un personnage politique, nous voudrions
                parcourir l'ensemble de ses connaissances et pouvoir coter chacune d'elle selon son importance dans le cercle des
                relations de notre sujet. 
            </div>
        </div>

        <div class="abraham">
        
            <div class="image" />
            <div class="subject">Abraham</div>
        
        </div>

        <div class="hadoop"> </div>


        <div class="giraph"> </div>

        <div class="inner">  </div>

       


    </div>

</template>


<script>


</script>

<style>

    body {
        background: url('../assets/apropos.png') no-repeat top center fixed;
        margin: 0;
        padding: 0;
        overflow: scroll;
    }


    .about .text {
        width: 960px;
        height: 125px;
        margin: 0 auto;
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
        margin-top: 300px;
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
    }

    .about .abraham {
        margin: 0 auto;     
        width: 960px;
        height: 414px;
        margin-top: 200px;
    }

    .about .abraham .image {
        background-image: url('../assets/abraham.jpg');
        width: 330px;
        height: 414px;
        float: left;  
    }

    .about .abraham .subject {
        float: right;
        width: 630px;
        font-size: 120px;
        font-weight: bold;
        text-align: center;
    }



    .about .giraph {
        width: 960px;
        height: 960px;
        background-image: url('../assets/giraph.png');
        margin: 0 auto;
        background-position: 0 -600px;
    }


</style>
