<template>
  <div>
    <div id="cy"></div>
  </div>
</template>

<script>
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import popper from "cytoscape-popper";

cytoscape.use(popper);
cytoscape.use(dagre);

export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const FONT_SIZE = "6px";
      const FONT_FAMILY = "sans-serif";
      const LINE_HEIGHT = 1.2;
      const WHITE_COLOR = "#FFF";

      const DULL_CALSSNAME = "dull";
      const HOVER_CLASSNAME = "hover";

      const SERVICE_NODE = "SERVICE_NODE";
      const SYSTEM_NODE = "SYSTEM_NODE";
      const API_NODE = "API_NODE";

      const NODE_TYPE = "node";
      const EDGE_TYPE = "edge";

      const HIGHLIGHT_DURATION = 100;
      const viewportOptions = {
        boxSelectionEnabled: true,
        autounselectify: true,
        motionBlur: false,
        maxZoom: 2.5,
        minZoom: 2,

        textureOnViewport: false
      };

      const style = [
        {
          selector: "node",
          style: {
            "font-size": FONT_SIZE,
            "font-family": FONT_FAMILY,
            "line-height": LINE_HEIGHT,
            color: WHITE_COLOR,
            "text-halign": "center",
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-max-width": 180,
            "text-background-padding": 3,
            label: node => node.data("formatLabel"),
            shape: node => node.data("shape"),
            width: node => node.data("width"),
            height: node => node.data("height"),
            "background-color": node => node.data("backgroundColor"),
            "background-opacity": 1,
            "overlay-color": WHITE_COLOR,
            "overlay-opacity": 0,
            "z-index-compare": "manual",
            "z-index": 111
          }
        },
        {
          selector: "node.hover",
          style: {}
        },
        {
          selector: "edge",
          style: {
            "font-size": FONT_SIZE,
            "font-family": FONT_FAMILY,
            "line-height": LINE_HEIGHT,
            color: "#333",
            width: 1,
            "arrow-scale": 0.6,
            label: edge => edge.data("label"),
            "line-style": () => "solid",
            "line-color": edge => edge.data("lineColor"),
            "target-arrow-color": edge => edge.data("lineColor"),
            "text-opacity": 1,
            "text-background-color": WHITE_COLOR,
            "text-background-opacity": 1,
            "text-background-padding": 2,
            "curve-style": "bezier",
            "control-point-step-size": 20,
            "target-arrow-shape": "triangle",
            "overlay-color": WHITE_COLOR,
            "overlay-opacity": 0,
            "z-index-compare": "manual",
            "z-index": 11
          }
        },
        {
          selector: "edge.hover",
          style: {
            "line-style": () => "solid",
            width: 2,
            "transition-property": "line-style, width",
            "transition-duration": "0.5s"
          }
        },
        {
          selector: ".dull",
          style: {
            "z-index-compare": "manual",
            "z-index": 1,
            opacity: 0.2
          }
        },
        {
          selector: "node.dull",
          style: {}
        },
        {
          selector: "edge.dull",
          style: {}
        }
      ];

      const layout = {
        name: "dagre",
        idealEdgeLength: 60,
        nodeOverlap: 20,
        //refresh: 20,
        fit: true,
        nodeSpacing: 5, //
        edgeLengthVal: 45, //
        animate: true,
        randomize: false,
        componentSpacing: 20,
        nodeRepulsion: 400,
        edgeElasticity: 10,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0

        // name: 'breadFirstxxx'
        //directed: true
      };

      const cy = cytoscape({
        container: document.getElementById("cy"), //获取定义的节点容器
        ...viewportOptions,
        style,
        layout,
        elements: {
          nodes: [
            {
              data: {
                id: "1",
                formatLabel: "输出层n1",
                shape: "rectangle",
                backgroundColor: "#F56C6C",
                width: 40,
                height: 40
              },
              classes: "multiline-manual"
            },
            {
              data: {
                id: "2",
                formatLabel: "中间层n2",
                shape: "ellipse",
                backgroundColor: "#15b1de",
                width: 35,
                height: 35
              }
            },
            {
              data: {
                id: "3",
                formatLabel: "中间层n3",
                shape: "ellipse",
                backgroundColor: "#15b1de",
                width: 35,
                height: 35
              }
            },
            {
              data: {
                id: "4",
                formatLabel: "中间层n4",
                shape: "ellipse",
                backgroundColor: "#15b1de",
                width: 35,
                height: 35
              }
            },
            {
              data: {
                id: "5",
                formatLabel: "中间层n5",
                shape: "ellipse",
                backgroundColor: "#15b1de",
                width: 35,
                height: 35
              }
            }
          ],
          edges: [
            {
              data: {
                source: "5",
                target: "1",
                lineColor: "#03A9F4"
                // label: "e51"
              }
            },
            {
              data: {
                source: "5",
                target: "3",
                lineColor: "#03A9F4"
                //label: "e53"
              }
            },
            {
              data: {
                source: "5",
                target: "2",
                lineColor: "#03A9F4"
                // label: "e52"
              }
            },
            {
              data: {
                source: "4",
                target: "1",
                lineColor: "#03A9F4"
                // label: "e41"
              }
            },
            {
              data: {
                source: "3",
                target: "1",
                lineColor: "#03A9F4"
                // label: "e31"
              }
            },
            {
              data: {
                source: "2",
                target: "1",
                lineColor: "#03A9F4"
                //label: "e21"
              }
            }
          ]
        }
      });

      var makeDiv = function(text) {
        var div = document.createElement("div");
        div.classList.add("popper-div");
        div.innerHTML = text;
        document.getElementById("cy").appendChild(div);
        return div;
      };

      var node1 = cy.getElementById("1");
      var node2 = cy.getElementById("2");

      var popper1 = node1.popper({
        content: function() {
          return makeDiv("【DAG】我是输出层-<br>基于Cytoscape..js");
        }
      });

      var popper2 = node2.popper({
        content: function() {
          return makeDiv("【DAG】我是中间层");
        }
      });

      var update1 = function() {
        popper1.scheduleUpdate();
      };
      var update2 = function() {
        popper2.scheduleUpdate();
      };

      node1.on("position", update1);
      node2.on("position", update2);
      cy.on("pan zoom resize", update1);
      cy.on("pan zoom resize", update2);
    }
  }
};
</script>

<style lang="scss">
#cy {
  background: #dee0db;
  width: 800px;
  height: 800px;
}
</style>
