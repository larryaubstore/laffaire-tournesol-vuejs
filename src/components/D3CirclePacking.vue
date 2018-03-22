<template>

<div class="d3CirclePacking">
        <svg id="svgContainer" width="960" height="960"></svg>

        <div class="titre">{{ titre }} (38)</div>
</div>

</template>


<script>

    import * as d3 from "d3";
    import * as debug from 'debug';

    
    const log = debug('d3CirclePacking');
    var timers = null;


    function tick() {

        if (timers) clearTimeout(timers);

        var urlJson = this.urlJson;

        timers = setTimeout( () => {
            document.getElementById("svgContainer").innerHTML = "";
            charge(urlJson);
        }, 1000);

    }

    function loadJson(urlJson) {
        log('loadJson');

        return new Promise( (resolve, reject) => {
            d3.json(urlJson, function(error, root) {
                if (error) {
                    log(error);
                    reject(error);
                } else {
                    resolve(root);
                }
            });
        });
    }


    function group(root) {
        if (root.children && root.children.length > 10) {

            let newChildren = [];
            let group = null;
            for (var i = 0; i < root.children.length; i+=4) {
                group = { name: "" + (i / 4 + 1), children: root.children.slice(i, i + 4) };
                newChildren.push(group);
            }

            root.children = newChildren;
            return root;


        } else {
            return root;
        }
    }


    function reduceChildren(root) {
        log('reduceChildren');

        if (root.children && root.children.length > 0) {

            let newChildren = [];
            root.children.forEach( (item) => {

                item = group(item);
                newChildren.push(item);
            });
            
            //children = group(children);
            //return root;

            root.children = newChildren;
            return root;


        } else {
            return root;
        }

    }

    function charge(urlJson) {

        log('charge');


        loadJson(urlJson).then( (root) => {
            return reduceChildren(root);
        }).then( (root) => {
            renderDetails(root);
            return null;
        });
    }


    function renderDetails(root) {


        log('renderDetails');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;


        


        var svg = d3.select("#svgContainer");
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
            .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
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

            transition.select('#svgContainer').selectAll("text")
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        }

        function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });
        }
    }



    export default {
        name: 'D3CirclePacking',
        props: {
            urlJson: String,
            titre: String
        },
        mounted: function () {


            log('mounted');
            
            charge(this.urlJson);

            

            window.removeEventListener("resize", tick.bind(this));
            window.addEventListener("resize", tick.bind(this));

        }
    }


    




    



</script>


<style>


    
    .d3CirclePacking .node {
        cursor: pointer;
    }

    .d3CirclePacking .node:hover {
        stroke: #000;
        stroke-width: 1.5px;
    }

    .d3CirclePacking .node--leaf {
        fill: white;
    }

    .d3CirclePacking .label {
        font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-anchor: middle;
        text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
    }

    .d3CirclePacking .label,
    .d3CirclePacking .node--root,
    .d3CirclePacking .node--leaf {
        pointer-events: none;
    }

    .d3CirclePacking .titre {
        float: right;
        font: 30px "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
        font-weight: bold;
        margin-right:20px;
        margin-top: 10px;
        clear: both;
    }

    .d3CirclePacking #svgContainer {
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 10;
    }


    


</style>
