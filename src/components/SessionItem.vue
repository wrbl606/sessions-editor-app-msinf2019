<template>
  <el-container class="interaction">
    <el-row>
      <p class="text date-text">{{ sessiondate }}</p>
      <p class="text owner-text">{{ sessionowner }}</p>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  data() {
    return {
      sessionowner: this.$props.owner,
      sessiondate: this.$props.date
    };
  }
})
export default class SessionItem extends Vue {
  @Prop({ default: "Unknown" }) private owner!: string;
  @Prop({ default: "Unknown" }) private date!: string;
}
</script>
<style scoped>
.el-row {
  width: 100%;
}
.text {
  text-align: left;
  margin-left: 10px;
}
.date-text {
  font-weight: bold;
  font-size: 1em;
}
.owner-text {
  font-size: 0.7em;
  color: #666;
}
.interaction {
  transition: 0.3s;
  cursor: pointer;
}
.interaction:hover {
  background: #e2f0ff;
}
.interaction:active {
  background: #85bef7;
}
</style>
