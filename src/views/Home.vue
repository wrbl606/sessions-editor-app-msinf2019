<template>
  <el-container class="home">
    <el-aside width="290px" class="session-list-container shadow">
      <SessionList @selectSession="selectSession" />
    </el-aside>
    <el-main class="main-container">
      <el-row>
        <SessionDetails
          v-if="sessionSelected"
          v-bind:session="sessionfromList"
          :key="sessionfromList.id"
          :accelerometerEntries="selectedSessionAccData"
          :gyroEntries="selectedSessionGyroData"
        ></SessionDetails>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SessionList from "@/components/SessionList.vue"; // @ is an alias to /src
import SessionDetails from "@/components/SessionDetails.vue";

@Component({
  components: {
    SessionList,
    SessionDetails
  },
  data() {
    return {
      sessionfromList: "",
      sessionSelected: false,
      selectedSessionAccData: [],
      selectedSessionGyroData: [],
      isUploading: false,
      isWaitingForUsername: false
    };
  },
  methods: {
    selectSession(item) {
      this.$data.sessionfromList = item;
      this.$data.sessionSelected = true;
    }
  }
})
export default class Home extends Vue {}
</script>
<style scoped>
.el-container {
  height: 97vh;
  padding: 0;
  margin: 0;
}
.el-aside {
  width: 290px;
  height: 98vh;
}
.el-main {
  padding: 0;
}
.shadow {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}
.loader {
  display: block;
  margin: 0 auto;
}
</style>
