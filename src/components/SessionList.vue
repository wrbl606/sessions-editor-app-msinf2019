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
        <li
          v-for="item in sessions"
          v-bind:key="item.id"
          @click="selectSession(item)"
        >
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
        {
          id: 1,
          sessionowner: "Artur",
          sessiondate: "20-05-2019",
          sessionLength: 1,
          sessionItemsCount: 2,
          minimumPeak: 3,
          maximumPeak: 4,
          peaksCount: 5,
          averagePeaksCount: 6,
          integralValue: 9
        },
        {
          id: 2,
          sessionowner: "Bartke",
          sessiondate: "23-05-2019",
          sessionLength: 7,
          sessionItemsCount: 6,
          minimumPeak: 5,
          maximumPeak: 4,
          peaksCount: 3,
          averagePeaksCount: 2,
          integralValue: 1
        },
        {
          id: 3,
          sessionowner: "Maciek",
          sessiondate: "33-03-2019",
          sessionLength: 33,
          sessionItemsCount: 22,
          minimumPeak: 33,
          maximumPeak: 44,
          peaksCount: 55,
          averagePeaksCount: 66,
          integralValue: 79
        }
      ]
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
</style>
