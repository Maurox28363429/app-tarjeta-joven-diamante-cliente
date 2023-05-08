<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
/* eslint-disable no-undef */
const aplication = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },

  // Bind Event Listeners
  bindEvents: function () {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },

  // deviceready Event Handler
  onDeviceReady: function () {
    console.log("Device is ready for work");
    if (universalLinks) {
      universalLinks?.subscribe(
        "openNewsListPage",
        aplication.onNewsListPageRequested
      );
      universalLinks?.subscribe(
        "openNewsDetailedPage",
        aplication.onNewsDetailedPageRequested
      );
    }
  },

  // openNewsListPage Event Handler
  onNewsListPageRequested: function (eventData) {
    console.log("Showing list of awesome news.");

    // do some work to show list of news
  },

  // openNewsDetailedPage Event Handler
  onNewsDetailedPageRequested: function (eventData) {
    console.log("Showing to user details page: " + eventData.path);

    // do some work to show detailed page
  },
};

aplication.initialize();
const app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },

  // Bind Event Listeners
  bindEvents: function () {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },

  // deviceready Event Handler
  onDeviceReady: function () {
    console.log("Device is ready for work");
    if (universalLinks) {
      universalLinks?.subscribe(
        "openNewsListPage",
        app.onNewsListPageRequested
      );
      universalLinks?.subscribe(
        "openNewsDetailedPage",
        app.onNewsDetailedPageRequested
      );
      universalLinks?.subscribe("launch", app.onApplicationDidLaunchFromLink);
    }
  },

  // openNewsListPage Event Handler
  onNewsListPageRequested: function (eventData) {
    console.log("Showing list of awesome news.");

    // do some work to show list of news
  },

  // openNewsDetailedPage Event Handler
  onNewsDetailedPageRequested: function (eventData) {
    console.log("Showing to user details page: " + eventData.path);

    // do some work to show detailed page
  },

  // launchedAppFromLink Event Handler
  onApplicationDidLaunchFromLink: function (eventData) {
    console.log("Did launch app from the link: " + eventData.url);
  },
};

onMounted(() => {
  if (universalLinks) {
    app.initialize();
  }
});
</script>
