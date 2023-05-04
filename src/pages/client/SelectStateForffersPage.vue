<template>
  <q-inner-loading :showing="isLoading">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <div class="q-px-md" v-if="!isLoading">
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
      <template v-for="state in data?.data" :key="state.id">
        <q-card
          class="stateCard column items-center cursor-pointer"
          @click="openOffers({ state: state.name, offers: state.ofertas })"
        >
          <q-card-section class="full-width column items-center">
            <q-img
              :src="`${
                state.ofertas === 0
                  ? 'src/assets/images/bandImage.png'
                  : 'src/assets/icons/stateIcon.webp'
              }`"
              spinner-color="white"
              style="height: 80px; max-width: 80px"
            />
            <p>{{ state.name }}</p>
          </q-card-section>
        </q-card>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useGetStates } from "src/querys/offersQuerys";
import { useRouter } from "vue-router";

const router = useRouter();
const { data, isLoading } = useGetStates();

const openOffers = ({ state, offers }) => {
  if (offers !== 0) {
    router.push(`/cliente/Offers/${state}`);
    console.log("hay ofertas");
  } else {
    console.log("no hay ofertas", offers);
  }
};

console.log(data?.value?.data, "data");
</script>

<style>
.stateCard {
  width: 140px;
  height: 140px;
}
</style>
