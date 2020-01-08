<template>
  <div id="DagGraph"></div>
</template>

<script>
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import popper from "cytoscape-popper";
cytoscape.use(popper);
cytoscape.use(dagre);

export default {
  name: "DagGraph",
  data() {
    return {
      nodeList: [
        {
          data: {
            id: 1,
            layer: "输出层1",
            text: "(1)：我是输出层<br>(2)：基于Cytoscape.js",
            url: "https://github.com/mopacha/vue-dag",
            shape: "round-rectangle",
            backgroundColor: "#f39a9a",
            borderColor: "#f56c6c",
            width: 50,
            height: 45
          }
        },
        {
          data: {
            id: 2,
            layer: "中间层2",
            text: "【DAG】我是中间层2",
            url: "https://github.com/mopacha",
            shape: "ellipse",
            backgroundColor: "#7ebbfa",
            borderColor: "#1890ff",
            width: 40,
            height: 40
          }
        },
        {
          data: {
            id: 3,
            layer: "中间层3",
            text: "I am text3",
            url: "https://github.com/mopacha/vue-dag",
            shape: "ellipse",
            backgroundColor: "#97d37a",
            borderColor: "#67c23a",
            width: 35,
            height: 35
          }
        },
        {
          data: {
            id: 4,
            layer: "中间层4",
            text: "I am text4",
            url: "https://github.com/mopacha/vue-dag",
            shape: "ellipse",
            backgroundColor: "#7ebbfa",
            borderColor: "#1890ff",
            width: 40,
            height: 40
          }
        },
        {
          data: {
            id: 5,
            layer: "中间层5",
            text: "I am text5",
            url: "https://github.com/mopacha/vue-dag",
            shape: "ellipse",
            backgroundColor: "#7ebbfa",
            borderColor: "#1890ff",
            width: 35,
            height: 35
          }
        }
      ],
      edgeList: [
        {
          data: {
            source: 5,
            target: 1,
            lineColor: "#7f7f7f"
          }
        },
        {
          data: {
            source: 5,
            target: 3,
            lineColor: "#03A9F4"
          }
        },
        {
          data: {
            source: 5,
            target: 2,
            lineColor: "#03A9F4"
          }
        },
        {
          data: {
            source: 4,
            target: 1,
            lineColor: "#ff5722"
          }
        },
        {
          data: {
            source: 3,
            target: 1,
            lineColor: "#03A9F4"
          }
        },
        {
          data: {
            source: 2,
            target: 1,
            lineColor: "#03A9F4"
          }
        }
      ]
    };
  },
  mounted() {
    this.renderDAG();
  },
  methods: {
    renderDAG() {
      const FONT_SIZE = "9px";
      const FONT_WEIGHT = 500;
      const FONT_FAMILY = "serif";
      const LINE_HEIGHT = 1.2;
      const WHITE_COLOR = "#FFF";
      const viewportOptions = {
        boxSelectionEnabled: true,
        autounselectify: true,
        motionBlur: false,
        maxZoom: 2,
        minZoom: 1.4,
        textureOnViewport: false
      };

      const style = [
        {
          selector: "node",
          style: {
            "border-width": 1,
            "font-size": FONT_SIZE,
            "font-family": FONT_FAMILY,
            //"font-weight": FONT_WEIGHT,
            "line-height": LINE_HEIGHT,
            color: WHITE_COLOR,
            "text-halign": "center",
            "text-valign": "center",
            "text-wrap": "wrap",
            "text-margin-y": -2,
            "text-max-width": 180,
            "text-background-padding": 3,
            label: node => node.data("layer"),
            shape: node => node.data("shape"),
            width: node => node.data("width"),
            height: node => node.data("height"),
            "background-color": node => node.data("backgroundColor"),
            "border-color": node => node.data("borderColor"),
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
            //label: edge => edge.data("label"),
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
        //name: 'breadFirstxxx'
        //directed: true
      };

      let cy = cytoscape({
        container: document.getElementById("DagGraph"), //获取定义的节点容器
        ...viewportOptions,
        style,
        layout,
        elements: {
          nodes: this.nodeList,
          edges: this.edgeList
        }
      });

      let makeDiv = function(text, url) {
        let a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.innerHTML = text;
        a.classList.add("popper-div");
        document.getElementById("DagGraph").appendChild(a);
        return a;
      };

      this.nodeList.map((item, index) => {
        let node = cy.getElementById(item.data.id);
        let popper = node.popper({
          content: function() {
            return makeDiv(item.data.text, item.data.url);
          }
        });

        let update = function() {
          popper.scheduleUpdate();
        };
        node.on("position", update);
        cy.on("pan zoom resize", update);
      });
    }
  }
};
</script>

<style lang="scss">
#DagGraph {
  width: 100%;
  height: 100%;
  .popper-div {
    font-size: 13px;
    text-decoration: none;
  }
}
</style>
