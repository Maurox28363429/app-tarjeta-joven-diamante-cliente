<script setup>
import { ref, watchEffect } from 'vue';
import { useGetNewsInformative } from 'src/querys/newsQuerys';

const openModal = ref(false);
const modalCurrent = ref({});
const currentPaginate = ref(1);

const pages = ref(1);
const search = ref('');

const {
  data: NewsData,
  isLoading,
  refetch,
  isFetching,
} = useGetNewsInformative({ search, pages });

const showModal = (modalInfo) => {
  modalCurrent.value = modalInfo;
  openModal.value = true;
};

watchEffect(() => {
  if (NewsData.value) {
    pages.value = NewsData?.value?.data?.pagination.lastPage;
  }
});

const handleSearch = () => {
  refetch();
};

const thereAreRedes = (redes) => {
  return (
    redes?.link_facebook !== 'null' ||
    redes?.link_instragram !== 'null' ||
    redes?.link_otros !== 'null' ||
    redes?.link_web !== 'null' ||
    redes?.link_youtube !== 'null'
  );
};

const isLink = (link) => {
  return link !== 'null';
};
</script>

<template>
  <div class="promotions">
    <!-- Título y campo de búsqueda -->
    <p style="margin: 20px 0" class="title-large">Noticias</p>
    <div class="search-box">
      <q-form class="full-width row justify-center" @submit="handleSearch">
        <q-input
          v-model="search"
          dense
          outlined
          rounded
          class="full-width"
          style="max-width: 400px"
          type="search"
          label="Buscar noticias"
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

    <!-- Cuadrícula de noticias -->
    <div class="news-grid">
      <!-- Si se están cargando las noticias, muestra los esqueletos -->

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
        <template v-if="NewsData?.data?.data.length === 0">
          <div class="no-results">No se encontraron resultados</div>
        </template>

        <template v-else>
          <template
            v-for="{ descripcion, img_url, titulo, id, ...item } in NewsData
              ?.data?.data"
            :key="id"
          >
            <q-card class="column no-wrap">
              <img
                :src="img_url"
                class="news-image"
                style="object-fit: contain"
              />
              <q-separator />

              <q-card-section>
                <div class="news-title line-clamp-2">{{ titulo }}</div>
              </q-card-section>

              <q-card-section
                class="q-pt-none q-px-xs column"
                style="min-height: 100px; justify-content: end"
              >
                <p class="line-clamp-3" v-html="descripcion" />
                <div style="justify-self: self-end">
                  <div class="row">
                    <a
                      v-if="isLink(item?.link_youtube)"
                      :href="item?.link_youtube"
                      target="_blank"
                      ><q-icon name="la la-youtube" color="primary" size="md"
                    /></a>
                    <a
                      v-if="isLink(item?.link_web)"
                      :href="item?.link_web"
                      target="_blank"
                      ><q-icon name="language" color="primary" size="md"
                    /></a>
                    <a
                      v-if="isLink(item?.link_instragram)"
                      :href="item?.link_instragram"
                      target="_blank"
                      ><q-icon name="la la-instagram" color="primary" size="md"
                    /></a>
                    <a
                      v-if="isLink(item?.link_facebook)"
                      :href="item?.link_facebook"
                      target="_blank"
                      ><q-icon name="facebook" color="primary" size="md"
                    /></a>
                    <a
                      v-if="isLink(item?.link_otros)"
                      :href="item?.link_otros"
                      target="_blank"
                      ><q-icon name="link" color="primary" size="md"
                    /></a>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions
                align="right"
                class="q-pt-none"
                style="flex: 1; align-items: end"
              >
                <q-btn
                  color="primary"
                  @click="
                    showModal({ descripcion, img_url, titulo, id, ...item })
                  "
                  flat
                  >Ver más</q-btn
                >
              </q-card-actions>
            </q-card>
          </template>
        </template>
      </template>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
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

    <q-dialog v-model="openModal">
      <q-card class="news-card modal-card">
        <q-card-section class="q-py-xs q-px-md">
          <div class="news-title">{{ modalCurrent.titulo }}</div>
        </q-card-section>
        <q-separator />
        <div class="full-width row justify-center">
          <img
            :src="modalCurrent.img_url"
            style="object-fit: contain; width: 240px; min-height: 200px"
          />
        </div>
        <q-separator />

        <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
          <div class="news-description" v-html="modalCurrent.descripcion" />
          <div>
            <p>Redes:</p>
            <p v-if="!thereAreRedes(modalCurrent)">No hay redes</p>
            <div class="row" v-if="thereAreRedes(modalCurrent)">
              <a
                v-if="isLink(modalCurrent?.link_youtube)"
                :href="modalCurrent.link_youtube"
                target="_blank"
                ><q-icon name="la la-youtube" color="primary" size="md"
              /></a>
              <a
                v-if="isLink(modalCurrent?.link_web)"
                :href="modalCurrent?.link_web"
                target="_blank"
                ><q-icon name="language" color="primary" size="md"
              /></a>
              <a
                v-if="isLink(modalCurrent?.link_instragram)"
                :href="modalCurrent?.link_instragram"
                target="_blank"
                ><q-icon name="la la-instagram" color="primary" size="md"
              /></a>
              <a
                v-if="isLink(modalCurrent?.link_facebook)"
                :href="modalCurrent?.link_facebook"
                target="_blank"
                ><q-icon name="facebook" color="primary" size="md"
              /></a>
              <a
                v-if="isLink(modalCurrent?.link_otros)"
                :href="modalCurrent?.link_otros"
                target="_blank"
                ><q-icon name="link" color="primary" size="md"
              /></a>
            </div>
          </div>
        </q-card-section>

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
</style>
