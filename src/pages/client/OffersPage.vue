<template>
  <div class="q-px-md">
    <div>
      <p style="margin: 20px 0" class="title-large">Ofertas</p>
      <div class="full-width full-height row justify-center q-mt-lg">
        <q-form class="full-width row justify-center" @submit="handleSearch">
          <q-input
            class="full-width"
            v-model="search"
            style="max-width: 400px"
            outlined
            type="search"
            label="Buscar ofertas"
            color="primary"
          >
            <q-btn
              type="submit"
              size="md"
              style="right: -12px; bottom: 0; top: 0"
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
            <q-card class="column" style="height: 400px; width: 100%; gap: 0">
              <q-card-section class="q-px-xs q-py-none">
                <img
                  style="
                    height: 120px;
                    width: 100%;
                    max-height: 200px;
                    object-fit: contain;
                  "
                  :src="
                    items.img_array_url[0]
                      ? items.img_array_url[0]
                      : 'https://cdn.quasar.dev/img/mountains.jpg'
                  "
                />
                <q-list>
                  <q-item
                    clickable
                    class="q-ma-none q-pa-none"
                    style="padding: 1em"
                  >
                    <q-item-section class="q-ma-none q-pa-none">
                      <q-item-label>
                        <p class="line-clamp-1">{{ items.nombre }}</p>
                      </q-item-label>
                      <q-item-label caption>
                        {{ items.comercio.name }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    class="q-ma-none q-pa-none"
                    v-if="items.price_total > 0"
                  >
                    <div class="q-mr-md q-ml-xs row items-center">
                      <q-icon size="xs" color="red" name="sell" />
                    </div>

                    <q-item-section>
                      <q-item-label v-if="items.price_total > 0"
                        >{{ items.price_total }} $</q-item-label
                      >
                      <q-item-label v-if="items.descuento > 0" caption
                        >Descuento{{ items.descuento }} %</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <p class="line-clamp-4 q-mb-none q-px-md">
                    {{ items.description }}
                  </p>
                </q-list>
              </q-card-section>
              <q-card-actions
                align="right"
                class="q-pt-none full-width"
                style="flex: 1; align-items: end"
              >
                <div class="row full-width justify-between">
                  <q-img
                    v-if="state != 'todos'"
                    @click="openWaze(items.link_map)"
                    src="../../assets/images/wazeIcon.jpg"
                    spinner-color="white"
                    style="
                      height: 40px;
                      max-width: 40px;
                      border-radius: 8px;
                      cursor: pointer;
                    "
                  />
                  <q-btn color="primary" @click="showModal({ ...items })" flat
                    >Ver más</q-btn
                  >
                </div>
              </q-card-actions>
            </q-card>
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
          boundary-numbers
        />
      </div>
    </div>
  </div>

  <q-dialog v-model="openModal">
    <q-card class="news-card modal-card">
      <q-card-section class="q-py-xs q-px-md">
        <div class="news-title">{{ modalCurrent.nombre }}</div>
      </q-card-section>
      <q-separator />

      <q-card-section
        class="q-pt-none scroll"
        style="max-height: 50vh"
        v-if="state != 'todos'"
      >
        <img :src="modalCurrent.img_array_url[0]" class="news-image" />
        <div class="body-medium">{{ modalCurrent.description }}</div>
        <div>
          <p>Dirección:</p>
          <q-img
            @click="openWaze(items.link_map)"
            src="../../assets/images/wazeIcon.jpg"
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

<script setup>
import { ref, watchEffect } from "vue";
import { useGetOffersFromBusiness } from "src/querys/offersQuerys";
import { useRoute } from "vue-router";

const currentPaginate = ref(1);
const paginas = ref(0);
const search = ref("");
const modalCurrent = ref({});
const openModal = ref(false);

const { params } = useRoute();
const state = ref(params.countryName);

console.log(params.countryName, "params.countryName");

const { data, isLoading, refetch, isFetching } = useGetOffersFromBusiness({
  search,
  page: currentPaginate,
  dir: state,
});

const openWaze = (link) => {
  link.forEach((element) => {
    if (element.ubication === state.value) {
      window.open(element.link, "_blank");
    }
  });
};

watchEffect(() => {
  if (data.value) {
    currentPaginate.value = data.value?.pagination.currentPage;
    paginas.value = data.value?.pagination.lastPage;
  }
});

const showModal = (modalInfo) => {
  modalCurrent.value = { ...modalInfo };
  openModal.value = true;
};

const handleSearch = () => {
  refetch();
};
</script>

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

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px 7px;
  min-height: 70vh;
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

.news-image {
  height: 140px;
  width: 100%;
  object-fit: contain;
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
</style>
