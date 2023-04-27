<template>
  <div class="full-width q-py-xl row justify-center items-center">
    <div class="full-width column items-center">
      <q-img
        src="../../assets/ghostIcon.png"
        spinner-color="white"
        style="height: 80px; max-width: 80px"
      />

      <p class="title-large" v-if="isMembershipsActive">
        Membresia de tipo {{ user.membresia.type }} activa
      </p>

      <p class="title-large" v-else-if="!isMembershipsActive">
        Membresia Vencida
      </p>
      <section>
        <br />
        <q-btn to="/memberships" color="primary" label="Renovar membresia" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { userAuth } from "src/composables/userAuth";
import { computed } from "vue";

const { user } = userAuth();

const isMembershipsActive = computed(() => {
  return !user.value.membresia.status === "vencida";
});
</script>
