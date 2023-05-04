<template>
  <div class="q-px-md">
    <div>
      <p class="title-large q-mt-xl text-center">Selecciona un estado</p>
    </div>

    <div class="row wrap q-gutter-md justify-center q-my-lg">
      <section>
        <router-link class="text-dark" to="/cliente/Offers/todos">
          <q-card class="stateCard column items-center cursor-pointer">
            <q-card-section>
              <div align="center">
                <q-img
                  src="../../assets/icons/stateIcon.webp"
                  spinner-color="white"
                  style="height: 80px; max-width: 80px"
                />
              </div>
              <p>Ver todo</p>
            </q-card-section>
          </q-card>
        </router-link>
      </section>
      <template v-for="state in PANAMA_STATE" :key="state.name">
        <router-link class="text-dark" :to="`/cliente/Offers/${state.name}`">
          <q-card class="stateCard column items-center cursor-pointer">
            <q-card-section class="full-width column items-center">
              <q-img
                src="../../assets/icons/stateIcon.webp"
                spinner-color="white"
                style="height: 80px; max-width: 80px"
              />
              <p>{{ state.name }}</p>
            </q-card-section>
          </q-card>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { PANAMA_STATE } from "src/shared/constansts/panamaState";
</script>

<style>
.stateCard {
  width: 140px;
  height: 140px;
}
</style>
