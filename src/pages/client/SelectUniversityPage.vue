<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import CardOffers from 'src/components/CardOffers.vue';
import { useGetUniversitiesById } from '../../querys/offersQuerys';

import { useGetUniversities } from 'src/querys/offersQuerys';
import wazeIcon from '../../assets/images/wazeIcon.jpg';

const currentPaginate = ref(1);
const pages = ref(0);
const search = ref('');

const { params } = useRoute();
const state = ref(params.countryName);

const openModal = ref(false);

const { data, isLoading, refetch, isFetching } = useGetUniversities({
  search,
  page: currentPaginate,
  dir: state,
});

const { data: university, isLoading: isLoadingUniversity } =
  useGetUniversitiesById(params.id);

const links = ref([]);

watchEffect(() => {
  if (university.value && params.id && !isLoadingUniversity.value) {
    openModal.value = true;
  }

  if (university.value && !isLoadingUniversity.value) {
    links.value = university?.value?.link_map
      ? JSON.parse(university?.value?.link_map)?.filter((element) => {
          return element?.link?.includes('http');
        })
      : null;
  }
});

const isValidLink = university?.value?.link_map && links?.value?.length > 0;

watchEffect(() => {
  if (data.value) {
    currentPaginate.value = data.value?.pagination.currentPage;
    pages.value = data.value?.pagination.lastPage;
  }
});
</script>

<template>
  <div class="q-px-md">
    <div>
      <p style="margin: 20px 0" class="title-large">Universidades y Otros</p>
      <div class="full-width full-height row justify-center q-mt-lg">
        <q-form class="full-width row justify-center" @submit="refetch">
          <q-input
            class="full-width"
            dense
            v-model="search"
            style="max-width: 400px"
            outlined
            rounded
            type="search"
            label="Buscar universidades"
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
          <template
            v-for="{
              description,
              img_array_url,
              nombre,
              link_map,
              id,
            } in data?.data"
            :key="id"
          >
            <CardOffers
              :description="description"
              :images="img_array_url"
              :name="nombre"
              :mapLink="link_map"
              :withModal="true"
            />
          </template>
        </template>
      </div>
      <div
        class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg"
      >
        <q-pagination
          v-if="!isLoading"
          style="margin-top: 1em"
          v-model="currentPaginate"
          :max="pages"
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

  <q-dialog v-model="openModal">
    <q-card class="news-card modal-card">
      <q-card-section class="q-py-xs q-px-md">
        <div class="news-title">{{ university.nombre }}</div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
        <img :src="university.img_array_url[0]" class="news-image" />
        <q-separator />
        <div class="body-medium" v-html="university.description" />
        <div>
          <p>Dirección:</p>
          <q-img
            v-if="isValidLink"
            @click="openWaze(university.link_map)"
            :src="wazeIcon"
            spinner-color="white"
            style="
              height: 40px;
              max-width: 40px;
              border-radius: 8px;
              cursor: pointer;
            "
          />
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Cerrar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
