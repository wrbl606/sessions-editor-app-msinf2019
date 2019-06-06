<template>
  <el-container>
    <el-dialog
      title="Uploading data"
      :visible.sync="isUploading"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <loader
        :loading="true"
        color="#409EFF"
        class="loader"
        radius="12px"
      ></loader>
      <span>Your data is being uploaded to the database. Please wait...</span>
    </el-dialog>

    <el-header>
      <el-button
        @click="loadSessionFile"
        type="primary"
        icon="el-icon-plus"
        size="medium"
        >Dodaj nową sesję</el-button
      >
    </el-header>

    <el-divider></el-divider>

    <el-main>
      <el-input placeholder="Szukaj..." v-model="searchText"></el-input>
      <div v-if="sessions.length == 0">
        <loader :loading="true" color="#409EFF" class="loader" radius="12px" />
        <p>Loading</p>
      </div>

      <ul class="session-list-container dashed-end" v-if="sessions.length > 0">
        <li
          v-for="item in sessions"
          v-bind:key="item.id"
          class
          @click="selectSession(item)"
        >
          <SessionItem
            class="dashed"
            :owner="item.sessionOwner"
            :date="item.sessionDate"
          />
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from "vue-property-decorator";
import SessionItem from "@/components/SessionItem.vue";
import SItem from "@/components/SItem.vue";
import { insertSession, getSessions } from "@/model/database/connection";
const { dialog } = require("electron").remote;
import SessionUnzipper from "@/model/sessions/SessionUnzipper";
import Loader from "vue-spinner/src/FadeLoader.vue";
import { MessageBoxData } from "element-ui/types/message-box";

@Component({
  components: {
    SessionItem,
    Loader
  },
  data() {
    return {
      searchtext: "",
      searchinput: "",
      isLoading: false,
      isUploading: false,
      sessions: []
    };
  },
  methods: {
    selectSession(item) {
      this.$emit("selectSession", item);
    }
  }
})
export default class SessionList extends Vue {
  @Model() private searchText!: string;

  async getSessions() {
    const sessions = await getSessions();

    this.$data.sessions = sessions.map((session: any) => {
      return {
        id: session.id_sesji,
        sessionOwner: session.kto,
        sessionDate: session.data
      };
    });
  }

  async loadSessionFile() {
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
      const accNorms = new Array<Number>();
      const gyroNorms = new Array<Number>();
      let counter = 0;
      unzipper.readAccelerometerDataToArray().forEach(entry => {
        if (counter > accNorms.length / 30) {
          accNorms.push(entry.norm);
          counter = 0;
        }
        counter++;
      });
      unzipper.readGyroDataToArray().forEach(entry => {
        if (counter > gyroNorms.length / 30) {
          gyroNorms.push(entry.norm);
          counter = 0;
        }
        counter++;
      });
      this.$data.selectedSessionAccData = accNorms;
      this.$data.selectedSessionGyroData = gyroNorms;

      const result: any = await this.$prompt(
        "Who is the author of given session?",
        "Please, put in the name",
        {
          confirmButtonText: "OK",
          closeOnClickModal: false,
          showClose: false,
          showCancelButton: false,
          inputPattern: /^(.){4,16}$/
        }
      );
      const username = result.value;

      this.$data.isUploading = true;
      await insertSession(
        new Date(),
        username,
        unzipper.readAccelerometerDataToArray(),
        unzipper.readGyroDataToArray()
      );
      this.$data.isUploading = false;

      this.$data.sessions = [];
      this.getSessions();
    } catch (e) {
      dialog.showErrorBox(
        "Invalid file",
        "Given file is not a valid session archive"
      );
      return;
    }
  }

  mounted() {
    this.getSessions();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.session-list {
  width: 100%;
}
.el-button {
  margin: 5px;
  width: 100%;
}
ul > li {
  list-style-type: none;
}
.el-divider,
.el-input {
  margin-top: 0;
}
.el-main {
  padding: 0;
}

* {
  color: black;
}
.session-list-container {
  padding-left: 0;
}
.el-container {
  height: 100%;
}
.dashed {
  border-top: 1px #aaaaaa dashed;
  border-left: 1px #aaaaaa dashed;
  border-right: 1px #aaaaaa dashed;
}
.dashed-end {
  border-bottom: 1px #aaaaaa dashed;
}
.loader {
  margin-left: 32px;
}
</style>
