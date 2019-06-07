<template>
  <vue-apex-charts
    :height="screenHeight / 5 > 160 ? screenHeight / 5 : 160"
    type="line"
    :options="options"
    :series="[{ name: $props.title, data: $props.series }]"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import VueApexCharts from "vue-apexcharts";

@Component({
  components: { VueApexCharts },
  data: function() {
    return {
      screenHeight: window.innerWidth,
      options: {
        title: {
          text: this.$props.title
        },
        yaxis: {
          title: {
            text: "Wartość"
          },
          labels: {
            formatter: (value: any) => `${parseInt(value)}`
          }
        },
        chart: {
          id: `line-chart-${this.$props.title}`,
          toolbar: {
            show: false
          }
        },
        xaxis: {
          labels: {
            show: true,
            formatter: (value: any, timestamp: number, index: number) => {
              return index % 100 === 0 ? `${value}` : "`";
            }
          },
          axisTicks: {
            show: false
          },
          tickAmount: 60,
          tooltip: {
            show: false
          }
        },
        stroke: {
          width: 2
        },
        colors: ["#409EFF"]
      }
    };
  }
})
export default class LineChart extends Vue {
  @Prop() private series!: Array<Number>;
  @Prop() private title!: string;
}
</script>
