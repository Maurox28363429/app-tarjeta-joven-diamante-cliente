<template>
  <router-view />
</template>

<script setup>
import { useGetAppVersion } from "src/querys/versionAppQuerys";
import { watchEffect, onMounted } from "vue";
import { useQuasar } from "quasar";

const { data: versionApp, isLoading } = useGetAppVersion();
const $q = useQuasar();

function alertMessage() {
  $q.dialog({
    title: `Actualización disponible: ${versionApp.value?.version}`,
    message: "hay una nueva version, por favor actualiza la app",
    persistent: true,
    cancel: true,
  })
    .onOk(() => {
      // console.log('OK')
      window.open(
        "https://play.google.com/store/apps/details?id=com.phoenixtechsa.app",
        "_system"
      );
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}

onMounted(() => {
  if (window.plugins?.preventscreenshot && window.cordova) {
    window.plugins.preventscreenshot.enable();
  }
});

watchEffect(() => {
  if (!isLoading.value) {
    if (process.env.VUE_APP_VERSION && versionApp.value) {
      if (
        Number(process.env.VUE_APP_VERSION) < Number(versionApp.value?.version)
      ) {
        // console.log("hay una nueva version");
        alertMessage();
      } else {
        // console.log("no hay una nueva version");
      }
    }
  }
});
</script>
