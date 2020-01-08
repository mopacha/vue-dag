<template>
  <div class="Dag">
    <DagGraph />
  </div>
</template>

<script>
import DagGraph from "@/components/DagGraph.vue";
export default {
  name: "Dag",
  components: {
    DagGraph
  }
};
</script>

<style lang="scss" scoped>
.Dag {
  width: 800px;
  height: 800px;
  background: #dee0db;
}
</style>
