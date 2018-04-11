<template>


    <div class="d3BubbleChart">

        <About hideBackground="true" />

        <div class="svgContainerSimpleCircle">
            <svg id="svgContainerSimpleCircle" width="500" height="500" font-family="sans-serif" font-size="10" text-anchor="middle"></svg>
        </div>

    </div>

</template>


<script>


    import * as d3 from "d3";
    import * as debug from 'debug';
    import About  from './About.vue';


    const log = debug('D3BubbleChart');
    log('D3BubbleChart');
   

    var timers = null;


    function tick() {

        if (timers) clearTimeout(timers);


        timers = setTimeout( () => {
            document.getElementById("svgContainerSimpleCircle").innerHTML = "";
            charge(this.data);
        }, 1000);

    }

    function charge(classes) {

        log('--');
        log(JSON.stringify(classes));

        var svg = d3.select("#svgContainerSimpleCircle"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var format = d3.format(",d");

        var color = d3.scaleOrdinal(d3.schemeCategory20c);

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);


        var root = d3.hierarchy({children: classes})
            .sum(function(d) { return d.value; })
            .each(function(d) {
                if (id = d.data.id) {
                var id, i = id.lastIndexOf(".");
                d.id = id;
                d.package = id.slice(0, i);
                d.class = id.slice(i + 1);
                }
            });

        var node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("r", function(d) { return d.r; })
            .attr("cursor", "pointer")
            .style("fill", function(d) { return color(d.package); })
            .on("mouseover", function (d) {
                d3.select(this).style("fill", "#60dcaf");
            })
            .on("mouseout", function (d) {
                d3.select(this).style("fill", color(d.package));
            });

        node.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.id; });

        node.append("text")
            .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
            .selectAll("tspan")
            .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .text(function(d) { return d; });

        node.append("title")
            .text(function(d) { return d.id + "\n" + format(d.value); });
    }



    export default {
        name: 'D3BubbleChart',
        props: {
            score: String,
            data: Object
        },
        components: {
            About
        },
        mounted: function () {

            log('mounted');

            charge(this.data);

            window.removeEventListener("resize", tick.bind(this));
            window.addEventListener("resize", tick.bind(this));




        }
    }





    




    



</script>


<style>

    .d3BubbleChart .svgContainerSimpleCircle {
        width: 100%;
        padding-top: 90px;
    }

    .d3BubbleChart #svgContainerSimpleCircle {
        z-index: 5;
    }
</style>
