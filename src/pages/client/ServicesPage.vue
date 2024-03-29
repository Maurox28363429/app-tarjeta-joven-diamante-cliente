<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useGetOffersFromBusiness } from 'src/querys/offersQuerys';
import CardOffers from 'src/components/CardOffers.vue';

const currentPaginate = ref(1);
const paginas = ref(0);
const search = ref('');

const route = useRoute();
const state = ref(route.params.countryName);

const { data, isLoading, refetch, isFetching } = useGetOffersFromBusiness({
  search,
  page: currentPaginate,
  dir: state,
});

watchEffect(() => {
  if (data.value) {
    currentPaginate.value = data.value?.pagination.currentPage;
    paginas.value = data.value?.pagination.lastPage;
  }
});
</script>
<template>
  <div class="q-px-md">
    <div>
      <p style="margin: 20px 0" class="title-large">Ofertas de servicios</p>
      <div class="full-width full-height row justify-center q-mt-lg">
        <q-form class="full-width row justify-center" @submit="refetch">
          <q-input
            class="full-width"
            v-model="search"
            style="max-width: 400px"
            outlined
            type="search"
            rounded
            label="Buscar ofertas"
            color="primary"
          >
            <q-btn
              type="submit"
              size="md"
              style="
                right: -12px;
                bottom: 0;
                top: 0;
                border-radius: 0 26px 26px 0;
              "
              color="primary"
              label="Buscar"
              icon="search"
              class="absolute"
            />
          </q-input>
        </q-form>
      </div>
      <div class="full-width full-height product-grid">
        <q-inner-loading
          :showing="isFetching && !isLoading"
          class="innerLoading"
        >
          <q-spinner-gears size="50px" color="primary" class="loading" />
        </q-inner-loading>

        <template v-if="isLoading">
          <div v-for="index in 20" :key="index" class="skeleton-card">
            <q-card class="my-card" style="height: 340px; width: 100%">
              <q-skeleton height="120px" width="100%" square />
              <q-card-section class="q-px-xs full-width">
                <q-skeleton style="margin-bottom: 10px" type="QSlider" />
                <q-skeleton style="margin-bottom: 10px" type="QSlider" />
                <q-skeleton type="text" class="text-caption" />
                <q-skeleton type="text" class="text-caption" />
                <q-skeleton type="text" class="text-caption" />
                <q-skeleton type="text" class="text-caption" />
              </q-card-section>
            </q-card>
          </div>
        </template>
        <div
          class="full-width row justify-center"
          v-if="data?.data.length === 0 && !isLoading"
        >
          <p class="title-medium">No hay ofertas</p>
        </div>
        <template v-if="!isLoading">
          <div v-for="items in data?.data" :key="items.id">
            <CardOffers
              :commerceName="items.comercio.name"
              :description="items.description"
              :images="items.img_array_url"
              :name="items.nombre"
              :totalPrice="items.price_total"
              :discount="items.descuento"
              :mapLink="items.link_map"
              :withModal="false"
            />
          </div>
        </template>
      </div>
      <div
        class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg"
      >
        <q-pagination
          v-if="!isLoading"
          style="margin-top: 1em"
          v-model="currentPaginate"
          :max="paginas"
          direction-links
          outline
          color="blue"
          active-design="unelevated"
          active-color="white"
          active-text-color="blue"
        />
      </div>
    </div>
  </div>
</template>

<style>
.innerLoading {
  z-index: 40;
}

.loading {
  top: 318px;
  left: 0;
  right: 0;
  bottom: unset;
  position: fixed;
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px 7px;
  min-height: 70vh;
  justify-content: center;
  padding: 20px 0;
}
</style>
