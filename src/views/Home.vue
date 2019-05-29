<template>
  <el-container class="home">
    <el-aside width="290px" class="session-list-container">
      <SessionList />
    </el-aside>
    <el-main class="main-container">
      <el-row>
        <SessionDetails />
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
  }
})
export default class Home extends Vue {}
</script>
<style scoped>
.el-aside {
  width: 290px;
  height: 100%;
}
.el-main {
  padding: 0;
}
</style>
