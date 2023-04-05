<template>
  <p class="q-ml-lg q-mt-lg title-large">Promociones</p>
  <div class="full-width full-height row justify-center q-mt-lg">
    <q-input
      v-model="search"
      outlined
      type="search"
      label="Buscar promociones"
      color="primary"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <div class="full-height row wrap q-gutter-lg q-my-lg q-px-md">
    <template v-if="!loading">
      <div
        style="min-height: 375px; width: 250px"
        v-for="items in news"
        :key="items.id"
      >
        <q-card class="my-card">
          <q-img
            :src="items.img_url"
            spinner-color="dark"
            style="height: 140px; width: 100%"
          />

          <q-card-section>
            <div class="text-h6 line-clamp-2">{{ items.titulo }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p class="line-clamp-3">{{ items.descripcion }}</p>
          </q-card-section>
          <q-card-actions align="right" class="q-pt-none">
            <q-btn color="primary" @click="showModal({ ...items })" flat
              >Ver mas</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </template>

    <template v-if="loading">
      <div v-for="items in skeletonPositions" :key="items.id">
        <q-card flat style="min-height: 375px; width: 250px">
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
  </div>

  <q-dialog v-model="openModal">
    <q-card class="my-card" style="width: 700px; max-width: 80vw">
      <q-img
        :src="modalCurrent.img_url"
        spinner-color="dark"
        style="height: 180px; width: 100%"
      />

      <q-card-section>
        <div class="col text-h6 ellipsis">
          {{ modalCurrent.titulo }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-caption text-grey">
          {{ modalCurrent.descripcion }}
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
import { ref, onMounted } from 'vue'
import getNews from 'src/api/getNews'

const openModal = ref(false)
const news = ref([])
const search = ref('')
const modalCurrent = ref({})
const loading = ref(false)
const skeletonPositions = new Array(20).fill(0)

const showModal = (modalInfo) => {
  console.log('openModal', modalInfo)
  modalCurrent.value = { ...modalInfo }
  openModal.value = true
}

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await getNews()
    console.log(loading.value, 'loading')
    news.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
    console.log(loading.value, 'loading')
  }
})
</script>

<style>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
