<template>
  <el-container>
    <el-header>
      <el-button type="primary" icon="el-icon-plus" size="medium"
        >Dodaj nową sesję</el-button
      >
    </el-header>

    <el-divider></el-divider>

    <el-main>
      <el-input placeholder="Please input" v-model="searchText"></el-input>
      <div v-if="sessions.length == 0">
        <p>No session found</p>
      </div>

      <ul class="session-list-container">
        <li v-for="item in sessions" v-bind:key="item.id">
          <SessionItem :owner="item.sessionowner" :date="item.sessiondate" />
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from "vue-property-decorator";
import SessionItem from "@/components/SessionItem.vue";
import SItem from "@/components/SItem.vue";
@Component({
  components: {
    SessionItem
  },
  data() {
    return {
      searchtext: "",
      searchinput: "",
      sessions: [
        { id: 1, sessionowner: "Artur", sessiondate: "20-05-2019" },
        { id: 2, sessionowner: "Bartek", sessiondate: "21-05-2019" },
        { id: 3, sessionowner: "Maciek", sessiondate: "20-06-2019" }
      ]
    };
  }
})
export default class SessionList extends Vue {
  @Model() private searchText!: string;
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
</style>
