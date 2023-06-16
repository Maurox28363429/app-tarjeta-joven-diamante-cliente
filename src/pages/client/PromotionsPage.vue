<script setup>
import { ref, watchEffect } from 'vue';
import { useGetPromotions } from 'src/querys/promotionsQuerys';

const openModal = ref(false);
const modalCurrent = ref({});
const currentPaginate = ref(1);

const pages = ref(1);
const search = ref('');

const {
  data: promotionsData,
  isLoading,
  refetch,
  isFetching,
} = useGetPromotions({ search, pages });

const showModal = (modalInfo) => {
  modalCurrent.value = { ...modalInfo };
  openModal.value = true;
};

watchEffect(() => {
  if (promotionsData.value) {
    pages.value = promotionsData?.value?.data?.pagination.lastPage;
  }
});
</script>

<template>
  <div class="promotions">
    <p style="margin: 20px 0" class="title-large">Promociones</p>
    <div class="search-box">
      <q-form class="full-width row justify-center" @submit="refetch">
        <q-input
          v-model="search"
          outlined
          class="full-width"
          style="max-width: 400px"
          type="search"
          label="Buscar promociones"
          color="primary"
          rounded
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

    <div class="news-grid">
      <q-inner-loading :showing="isFetching && !isLoading" class="innerLoading">
        <q-spinner-gears size="50px" color="primary" class="loading" />
      </q-inner-loading>

      <template v-if="isLoading">
        <div v-for="index in 20" :key="index" class="skeleton-card">
          <q-card flat>
            <q-skeleton height="150px" square />
            <q-card-section>
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
            </q-card-section>
            <q-card-actions align="right" class="q-pt-none">
              <q-skeleton type="QBtn" />
            </q-card-actions>
          </q-card>
        </div>
      </template>

      <!-- Si las noticias están cargadas, muestra la cuadrícula -->
      <template v-else>
        <template v-if="promotionsData?.data?.data.length === 0">
          <div class="no-results">No se encontraron resultados</div>
        </template>

        <template v-else>
          <template v-for="item in promotionsData?.data?.data" :key="item.id">
            <q-card class="news-card">
              <q-img
                :src="item.img_url"
                spinner-color="dark"
                class="news-image"
                fit="contain"
              />
              <q-separator />

              <q-card-section>
                <div class="news-title line-clamp-2">{{ item.titulo }}</div>
              </q-card-section>

              <q-card-section
                class="q-pt-none q-px-xs column"
                style="min-height: 100px; justify-content: end"
              >
                <p class="news-description line-clamp-3">
                  {{ item.descripcion }}
                </p>
                <div style="justify-self: self-end">
                  <div class="row">
                    <a v-if="item.links?.youtube" :href="item.links?.youtube"
                      ><q-icon name="la la-youtube" color="primary" size="md"
                    /></a>
                    <a v-if="item.links?.web" :href="item.links?.web"
                      ><q-icon name="language" color="primary" size="md"
                    /></a>
                    <a
                      v-if="item.links?.instagram"
                      :href="item.links?.instagram"
                      ><q-icon name="la la-instagram" color="primary" size="md"
                    /></a>
                    <a v-if="item.links?.facebook" :href="item.links?.facebook"
                      ><q-icon name="facebook" color="primary" size="md"
                    /></a>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions
                align="right"
                class="q-pt-none"
                style="flex: 1; align-items: end"
              >
                <q-btn color="primary" @click="showModal({ ...item })" flat
                  >Ver más</q-btn
                >
              </q-card-actions>
            </q-card>
          </template>
        </template>
      </template>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="currentPaginate" :max="pages" />
    </div>

    <q-dialog v-model="openModal">
      <q-card class="news-card modal-card">
        <q-card-section class="q-py-xs q-px-md">
          <div class="news-title">{{ modalCurrent.titulo }}</div>
        </q-card-section>
        <q-separator />

        <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
          <q-img
            :src="modalCurrent.img_url"
            spinner-color="dark"
            class="body-medium"
          />
          <q-separator />
          <div class="news-description">{{ modalCurrent.descripcion }}</div>
          <div>
            <p>Redes:</p>
            <p v-if="!modalCurrent.links">No hay redes</p>
            <div class="row">
              <a
                v-if="modalCurrent.links?.youtube"
                :href="modalCurrent.links?.youtube"
                ><q-icon name="la la-youtube" color="primary" size="md"
              /></a>
              <a v-if="modalCurrent.links?.web" :href="modalCurrent.links?.web"
                ><q-icon name="language" color="primary" size="md"
              /></a>
              <a
                v-if="modalCurrent.links?.instagram"
                :href="modalCurrent.links?.instagram"
                ><q-icon name="la la-instagram" color="primary" size="md"
              /></a>
              <a
                v-if="modalCurrent.links?.facebook"
                :href="modalCurrent.links?.facebook"
                ><q-icon name="facebook" color="primary" size="md"
              /></a>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Cerrar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<style>
.promotions {
  padding: 0 24px;
}
.loading {
  top: 318px;
  left: 0;
  right: 0;
  bottom: unset;
  position: fixed;
  width: 100%;
}

.innerLoading {
  z-index: 20;
}

.title-large {
  margin-left: 24px;
  margin-top: 24px;
}

.search-box {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 16px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px 7px;
  justify-content: center;
  padding: 20px 0;
}

.news-card {
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.24) 0px 1px 1px 0px;
  overflow: hidden;
}

.skeleton-card {
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px 0px, rgba(0, 0, 00px 1px 1px 0px);
  overflow: hidden;
}

.news-image {
  height: 140px;
  width: 100%;
}

.news-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.modal-card {
  width: 700px;
  max-width: 80vw;
}

.no-results {
  font-size: 1.2rem;
  font-style: italic;
  text-align: center;
  margin: 32px 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
