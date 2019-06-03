<template>
  <el-container class="home">
    <el-aside width="290px" class="session-list-container shadow">
      <SessionList
        @selectSession="selectSession"
        @addSession="loadSessionFile"
      />
    </el-aside>
    <el-main class="main-container">
      <el-row>
        <SessionDetails
          v-if="sessionLoad"
          v-bind:session="sessionfromList"
          :key="sessionfromList.id"
        ></SessionDetails>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SessionList from "@/components/SessionList.vue"; // @ is an alias to /src
import SessionDetails from "@/components/SessionDetails.vue";
const { dialog } = require("electron").remote;
import SessionUnzipper from "@/model/sessions/SessionUnzipper";

@Component({
  components: {
    SessionList,
    SessionDetails
  },
  data() {
    return {
      sessionfromList: "",
      sessionLoad: false
    };
  },
  methods: {
    selectSession(item) {
      this.$data.sessionfromList = item;
      this.$data.sessionLoad = true;
    },
    loadSessionFile() {
      const filePath = dialog.showOpenDialog({
        title: "Pick a session file to load",
        filters: [
          {
            name: "Session file (archive)",
            extensions: ["zip"]
          }
        ],
        properties: ["openFile"]
      });
      if (!filePath) return;

      try {
        const unzipper = new SessionUnzipper(filePath[0]);
        // TODO: create session in db and upload all entries from unzipped file
      } catch (e) {
        dialog.showErrorBox(
          "Invalid file",
          "Given file is not a valid session archive"
        );
        return;
      }
    }
  }
})
export default class Home extends Vue {}
</script>
<style scoped>
.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
}
.el-aside {
  width: 290px;
  height: 98vh;
}
.el-main {
}
.shadow {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
}
</style>
