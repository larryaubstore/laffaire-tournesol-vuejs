<template>

<div id="root">
        <svg id="svgContainer" width="960" height="960"></svg>

        <div class="titre">{{ titre }}</div>
</div>

</template>


<script>

    import * as d3 from "d3";
    import * as debug from 'debug';

    
    const log = debug('d3Circular');
    var timers = null;


    function tick() {

        if (timers) clearTimeout(timers);

        var urlJson = this.urlJson;

        timers = setTimeout( () => {
            document.getElementById("svgContainer").innerHTML = "";
            charge(urlJson);
        }, 1000);

    }

    function charge(urlJson) {


        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;


        


        var svg = d3.select("svg");
        svg.attr("width", parseInt(windowWidth / 2));
        svg.attr("height", windowHeight);

        

        
        var margin = 20,
            diameter = parseInt(windowWidth / 2),
            

            scaleG = svg.append("g").attr("transform", "scale(1)"),




            g = scaleG.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")"),
            animateTransform = scaleG.append("animateTransform")
                .attr("attributeName", "transform")
                .attr("type", "translate")
                .attr("from", -1000 + " 0")
                .attr("to", "0 0")
                .attr("begin", "0s")
                .attr("dur", "1s")
                .attr("repeatCount", "0");



        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        d3.json(urlJson, function(error, root) {
            if (error) throw error;

            root = d3.hierarchy(root)
                .sum(function(d) { return d.size; })
                .sort(function(a, b) { return b.value - a.value; });

            var focus = root,
                nodes = pack(root).descendants(),
                view;

            var circle = g.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
                .style("fill", function(d) { return d.children ? color(d.depth) : null; })
                .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

            var text = g.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function(d) { return d.parent === root  ? 1 : 0; })
                .style("display", function(d) { return d.parent === root  ? "inline" : "none"; })
                .text(function(d) { 



                    if (d.data.title) {
                        let displayName = d.data.title;
                        displayName = displayName.replace('%C3%B3', 'ó');
                        displayName = displayName.replace('%C3%AD', 'í');
                        displayName = displayName.replace('%C3%A9', 'é');
                        displayName = displayName.replace('%C3%A1', 'á');
                        return displayName;
                    } else {
                        let displayName = d.data.name.replace('https://en.wikipedia.org/wiki/', ''); 

                        displayName = displayName.replace('%C3%B3', 'ó');
                        displayName = displayName.replace('%C3%AD', 'í');
                        displayName = displayName.replace('%C3%A9', 'é');
                        displayName = displayName.replace('%C3%A1', 'á');
                        return displayName; 
                    }
                });

            var node = g.selectAll("circle,text");

            svg
                .style("background", color(-1))
                .on("click", function() { zoom(root); });

            zoomTo([root.x, root.y, root.r * 2 + margin]);

            function zoom(d) {
                var focus0 = focus; focus = d;

                var transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function(d) {
                    var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                    return function(t) { zoomTo(i(t)); };
                    });

                transition.selectAll("text")
                .filter(function(d) { return d.parent === focus || this.style.display  || true === "inline"; })
                    .style("fill-opacity", function(d) { return d.parent === focus || true ? 1 : 0; })
                    .on("start", function(d) { if (d.parent === focus || true) this.style.display = "inline"; })
                    .on("end", function(d) { if (d.parent !== focus && false) this.style.display = "none"; });
            }

            function zoomTo(v) {
                var k = diameter / v[2]; view = v;
                node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
                circle.attr("r", function(d) { return d.r * k; });
            }
        });
        
    }


    export default {
        name: 'D3Circular',
        props: {
            urlJson: String,
            titre: String
        },
        mounted: function () {


            
            charge(this.urlJson);

            

            window.removeEventListener("resize", tick.bind(this));
            window.addEventListener("resize", tick.bind(this));

        }
    }


    




    



</script>


<style>

    .node {
        cursor: pointer;
    }

    .node:hover {
        stroke: #000;
        stroke-width: 1.5px;
    }

    .node--leaf {
        fill: white;
    }

    .label {
        font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-anchor: middle;
        text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
    }


    /*
    .label,
    .node--root,
    .node--leaf {
        pointer-events: none;
    }
    */

    .label,
    .node--root {
        pointer-events: none;
    }



    .titre {
        float: right;
        font: 30px "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
        font-weight: bold;
        margin-right:20px;
        margin-top: 10px;
    }


</style>
