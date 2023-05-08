<template>
  <q-inner-loading :showing="isLoadingUser">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <div class="full-width q-py-xl row justify-center items-center relative">
    <div
      class="column items-center absolute-center full-width"
      v-if="!isLoadingUser"
    >
      <q-img
        src="../../assets/images/t.webp"
        spinner-color="white"
        style="height: 200px; max-width: 200px"
      />

      <p class="q-ma-none title-large text-center" v-if="isMembershipsActive">
        La membresía se encuentra activa, sigue disfrutando de tus beneficios
      </p>

      <p
        class="q-ma-none title-large text-center"
        v-else-if="!isMembershipsActive"
      >
        La membresía esta vencida haz click en el botón de abajo para renovar
      </p>
      <section>
        <br />
        <q-btn
          v-if="!isMembershipsActive"
          to="/memberships"
          color="primary"
          label="Renovar membresia"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { userAuth } from 'src/composables/userAuth'
import { computed } from 'vue'

const { userData, isLoadingUser } = userAuth()

const isMembershipsActive = computed(() => {
  return userData.value?.membresia?.status === 'activa'
})

console.log(isMembershipsActive.value, 'isMembershipsActive')
</script>
