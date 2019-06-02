<template>
  <el-container>
    <el-header>
      <div class="text-wrapper">
        <p class="header-text">Szczegóły sesji</p>
        <p class="add-text">
          Dodano przez {{ sessionOwner }} dnia {{ sessionDate }}
        </p>
      </div>
    </el-header>

    <el-main>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-tooltip
            class="item"
            content="Długość sesji"
            placement="top"
            effect="light"
          >
            <div class="radius large-data-container shadow">
              <p>{{ sessionLength }}s</p>
            </div>
          </el-tooltip>
        </el-col>
        <el-col :span="18">
          <el-row :gutter="30">
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Ilość wpisów"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ sessionItemsCount }}</p>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Ilość pików"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ peaksCount }}</p>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Średnia ilość  pików na minutę"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ averagePeaksCount }}</p>
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Najwyższy pik"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ maximumPeak }}</p>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Najniższy pik"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ minimumPeak }}</p>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Wartość całki"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ integralValue }}</p>
                </div>
              </el-tooltip>
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
      sessionOwner: this.$props.session.sessionOwner,
      sessionDate: this.$props.session.sessionDate,
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
  font-size: 1.3rem;
  font-weight: bold;
}
.radius {
  border-radius: 4px;
  border: 1px solid #eee;
}
.shadow {
  box-shadow: 2px 12px 16px -21px rgba(0, 0, 0, 0.75);
}
</style>
