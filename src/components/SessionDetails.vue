<template>
  <el-container>
    <el-header>
      <div class="text-wrapper">
        <h1 class="header-text">
          Szczegóły sesji
          <loader
            :loading="isLoading"
            color="#409EFF"
            class="loader"
            radius="12px"
          ></loader>
        </h1>
        <p class="add-text">
          Dodano przez {{ sessionOwner }} dnia {{ sessionDate }}
        </p>
      </div>
    </el-header>

    <el-main>
      <el-row :gutter="30">
        <el-col :span="6" class="data-containers">
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
          <el-row :gutter="30" class="data-container-row">
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
                content="Średnia ilość pików na minutę"
                placement="top"
                effect="light"
              >
                <div class="radius data-container shadow">
                  <p>{{ averagePeaksCount }}</p>
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row :gutter="30" class="data-container-row">
            <el-col :span="6">
              <el-tooltip
                class="item"
                content="Najwyższy pik"
                placement="bottom"
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
                placement="bottom"
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
                placement="bottom"
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
      <el-row>
        <chart
          class="chart"
          :series="accelerometerEntries"
          title="Wpisy z akcelerometru"
        />
        <chart class="chart" :series="gyroEntries" title="Wpisy z żyroskopu" />
      </el-row>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Chart from "./LineChart.vue";
import { getSessionEntries } from "@/model/database/connection";
import SessionDataRow from "../model/sessions/SessionDataRow";
import SessionCharacteristics, {
  serialization
} from "../model/sessions/SessionCharacteristics";
import Loader from "vue-spinner/src/FadeLoader.vue";

@Component({
  components: { Chart, Loader },
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
      integralValue: this.$props.session.integralValue,
      accelerometerEntries: [],
      gyroEntries: [],
      isLoading: false
    };
  }
})
export default class SessionDetails extends Vue {
  @Prop() private session!: any;

  async getSession() {
    this.$data.isLoading = true;
    const sessionId = this.session.id;
    const sessionEntries = await getSessionEntries(sessionId);
    const accelerometerEntries: SessionDataRow[] = sessionEntries
      .filter(entry => entry.typ === "acc")
      .map(
        entry => new SessionDataRow(entry.timestamp, entry.x, entry.y, entry.z)
      );
    const gyroEntries: SessionDataRow[] = sessionEntries
      .filter(entry => entry.typ === "gyro")
      .map(
        entry => new SessionDataRow(entry.timestamp, entry.x, entry.y, entry.z)
      );
    this.generateStatictics(accelerometerEntries, gyroEntries);
    let counter = 0;
    this.$data.accelerometerEntries = accelerometerEntries
      .map(entry => entry.norm)
      .filter(_ => {
        counter++;
        return (
          counter % Math.ceil(1 / (2000 / accelerometerEntries.length)) === 0
        );
      });
    counter = 0;
    this.$data.gyroEntries = gyroEntries
      .map(entry => entry.norm)
      .filter(_ => {
        counter++;
        return (
          counter % Math.ceil(1 / (2000 / accelerometerEntries.length)) === 0
        );
      });

    this.$data.isLoading = false;
  }

  generateStatictics(acc: SessionDataRow[], gyro: SessionDataRow[]) {
    this.$data.sessionLength = Math.ceil(
      (acc[acc.length - 1].time - acc[0].time) / 1000
    );
    const characteristics: SessionCharacteristics = serialization(acc, gyro);
    this.$data.sessionItemsCount = acc.length + gyro.length;
    this.$data.peaksCount = Math.floor(
      (characteristics.accValueLength + characteristics.gyroValueLength) / 2
    );
    this.$data.averagePeaksCount = Math.floor(
      (characteristics.avgAccPeaks + characteristics.avgGyroPeaks) / 2
    );
    this.$data.minimumPeak = characteristics.accMin.toFixed(2);
    this.$data.maximumPeak = characteristics.accMax.toFixed(2);
    this.$data.integralValue = characteristics.gyroIntegralPerSecond.toFixed(2);
  }

  mounted() {
    this.getSession();
  }
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
.el-col {
  margin-bottom: 10px;
}
.data-container-row {
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
  transition: 0.3s;
  box-shadow: 2px 12px 16px -21px rgba(0, 0, 0, 0.75);
}
.item:hover {
  box-shadow: 2px 22px 16px -21px rgba(0, 0, 0, 0.75);
}
.loader {
  display: inline;
  position: relative;
  top: -20px;
  left: 16px;
}
</style>
