<template>


    <div class="d3BubbleChart">

        <About hideBackground="true" />

        <div class="svgContainerSimpleCircle">
            <svg id="svgContainerSimpleCircle" width="500" height="500" font-family="sans-serif" font-size="10" text-anchor="middle"></svg>
        </div>

    </div>

</template>


<script>


    import * as d3          from "d3";
    import * as debug       from 'debug';
    import * as _           from 'lodash';

    import { Util }        from '../lib/util';
    var util = new Util();
    

    import About            from './About.vue';


    const log = debug('D3BubbleChart');
    log('D3BubbleChart');
   

    var timers = null;



    function tick() {

        if (timers) clearTimeout(timers);

        var scope = this;


        timers = setTimeout( () => {
            document.getElementById("svgContainerSimpleCircle").innerHTML = "";
            preCharge.bind(scope)();
        }, 1000);

    }

    function preCharge() {
        if (typeof(this.urlJson) !== "undefined") {
            util.loadJson(this.urlJson).then( (data) => {
                return util.flat(data);
            }).then( (data) => {

                let dataMapped =  data.map( (item) => {
                    return {    id: "padding." + item.name, 
                                value: item.size,
                                title: item.title
                            };
                });

                charge.bind(this)(dataMapped);
            });
        } else {
            charge.bind(this)(this.data);
        }

    }

    function charge(classes) {

        log('--');
        log(JSON.stringify(classes));

        var windowWidth     = window.innerWidth;
        var windowHeight    = window.innerHeight - 100;




        var svg = d3.select("#svgContainerSimpleCircle");
        svg.attr("width", parseInt(windowWidth));
        svg.attr("height", parseInt(windowHeight));


        var width = +svg.attr("width");
        var height = +svg.attr("height");

        var container = d3.select(".svgContainerSimpleCircle");
        container.style("width", width + "px");
            

        var format = d3.format(",d");

        var color = d3.scaleOrdinal(d3.schemeCategory20c);


        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);

        var scope = this;

        log('===============> ' + scope.disableClick);


        

        var root = d3.hierarchy({children: classes})
            .sum(function(d) { return d.value; })
            .each( (d) => {
                if (id = d.data.id) {
                    var id, i = id.lastIndexOf(".");
                    d.id = id;
                    d.package = id.slice(0, i);
                    d.class = id.slice(i + 1);
                    d.title = d.data.title;

                    
                    if (scope.disableClick == true) {
                        d.disableClick = true;
                    } else {
                        d.disableClick = false;
                    }
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
                if (d.disableClick == false) {
                    d3.select(this).style("fill", "#60dcaf");
                }
            })
            .on("mouseout", function (d) {
                if (d.disableClick == false) {
                    d3.select(this).style("fill", color(d.package));
                }
            })
            .on("click", function(d) {
                if (d.disableClick == false) {
                    window.location = "/sujet/"  + d.class;
                }
            });

        node.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.id; });

        node.append("text")
            .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
            .selectAll("tspan")
            .data(function(d) {

                if (d.title)  {
                    let displayName = d.title;
                    displayName = displayName.replace('%C3%B3', 'ó');
                    displayName = displayName.replace('%C3%AD', 'í');
                    displayName = displayName.replace('%C3%A9', 'é');
                    displayName = displayName.replace('%C3%A1', 'á');
                    return displayName.split(/(?=[A-Z][^A-Z])/g); ;

                } else {
                    return d.class.split(/(?=[A-Z][^A-Z])/g); 
                }
                
            })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .text(function(d) { return d; });

        node.append("title")
            .text(function(d) {

                if (d.title) {
                    let displayName = d.title;
                    displayName = displayName.replace('%C3%B3', 'ó');
                    displayName = displayName.replace('%C3%AD', 'í');
                    displayName = displayName.replace('%C3%A9', 'é');
                    displayName = displayName.replace('%C3%A1', 'á');
                    return displayName;
                } else {
                    return "";
                }
            });
    }



    export default {
        name: 'D3BubbleChart',
        props: {
            score: String,
            data: Array,
            urlJson: String,
            disableClick: Boolean
        },
        components: {
            About
        },
        mounted: function () {
            log('mounted');


            log('++++++++++++++> ' + this.disableClick);


            preCharge.bind(this)();

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
        z-index: 0;
    }


    .svgContainerSimpleCircle  {
        margin: 0 auto;
    }
</style>
