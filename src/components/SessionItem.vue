<template>
  <el-container class="dashed">
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
  @Prop({ default: "Artur" }) private owner!: string;
  @Prop({ default: "29-06-2019" }) private date!: string;
}
</script>
<style scoped>
.dashed {
  border: 2px #aaaaaa dashed;
}
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
  color: #aaaaaa;
}
</style>
