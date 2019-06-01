<template>
  <el-container>
    <el-header>
      <div class="text-wrapper">
        <p class="header-text">Szczegóły sesji</p>
        <p class="add-text">Dodano przez Michał dnia 2019-02-2019</p>
      </div>
    </el-header>

    <el-main>
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="radius large-data-container shadow">
            <el-tooltip
              class="item"
              content="Długość sesji"
              placement="top"
              effect="light"
            >
              <p>{{ sessionLength }}</p>
            </el-tooltip>
          </div>
        </el-col>
        <el-col span="18">
          <el-row gutter="30">
            <el-col :span="6">
              <div class="radius data-container radius">
                <el-tooltip
                  class="item"
                  content="Ilość wpisów"
                  placement="top"
                  effect="light"
                >
                  <p>{{ sessionItemsCount }}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="radius data-container radius">
                <el-tooltip
                  class="item"
                  content="Ilość pików"
                  placement="top"
                  effect="light"
                >
                  <p>{{ peaksCount }}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="radius data-container radius">
                <el-tooltip
                  class="item"
                  content="Średnia ilość  pików na minutę"
                  placement="top"
                  effect="light"
                >
                  <p>{{ averagePeaksCount }}</p>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6">
              <div class="radius data-container shadow">
                <el-tooltip
                  class="item"
                  content="Najwyższy pik"
                  placement="top"
                  effect="light"
                >
                  <p>{{ maximumPeak }}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="radius data-container shadow">
                <el-tooltip
                  class="item"
                  content="Najniższy pik"
                  placement="top"
                  effect="light"
                >
                  <p>{{ minimumPeak }}</p>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="radius data-container shadow">
                <el-tooltip
                  class="item"
                  content="Wartość całki"
                  placement="top"
                  effect="light"
                >
                  <p>{{ integralValue }}</p>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  data() {
    return {
      sessionLength: this.$props.session.sessionLength,
      sessionItemsCount: this.$props.session.sessionItemsCount,
      minimumPeak: this.$props.session.minimumPeak,
      maximumPeak: this.$props.session.maximumPeak,
      peaksCount: this.$props.session.peaksCount,
      averagePeaksCount: this.$props.session.averagePeaksCount,
      integralValue: this.$props.session.integralValue
    };
  }
})
export default class SessionDetails extends Vue {
  @Prop() private session!: any;
}
</script>
<style scoped>
.header-text {
  font-size: 36px;
  font-weight: bold;
  text-align: left;
  margin: 0;
}
.add-text {
  font-size: 14px;
  color: #8b8b8b;
  margin: 0;
}
.text-wrapper {
  text-align: left;
}
.el-main {
}
.el-col {
  margin-bottom: 10px;
}
.el-row {
  height: 80px;
}
.data-container {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.large-data-container {
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.radius {
  border-radius: 4px;
  border: 2px solid #c9c9c9;
}
.shadow {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}
</style>
