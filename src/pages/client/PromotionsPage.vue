<template>
  <div class="promotions">
    <!-- Título y campo de búsqueda -->
    <p class="title-large">Promociones</p>
    <div class="search-box">
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

    <!-- Cuadrícula de noticias -->
    <div class="news-grid">
      <!-- Si se están cargando las noticias, muestra los esqueletos -->
      <template v-if="loading">
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
        <template v-if="filteredNews.length === 0">
          <div class="no-results">No se encontraron resultados</div>
        </template>

        <template v-else>
          <template v-for="item in filteredNews" :key="item.id">
            <q-card class="news-card">
              <q-img
                :src="item.img_url"
                spinner-color="dark"
                class="news-image"
              />

              <q-card-section>
                <div class="news-title line-clamp-2">{{ item.titulo }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <p class="news-description line-clamp-3">
                  {{ item.descripcion }}
                </p></q-card-section
              >

              <q-card-actions align="right" class="q-pt-none">
                <q-btn color="primary" @click="showModal({ ...item })" flat
                  >Ver más</q-btn
                >
              </q-card-actions>
            </q-card>
          </template>
        </template>
      </template>
    </div>

    <!-- Diálogo modal de noticias -->
    <q-dialog v-model="openModal">
      <q-card class="news-card modal-card">
        <q-img
          :src="modalCurrent.img_url"
          spinner-color="dark"
          class="news-image"
        />

        <q-card-section>
          <div class="news-title">{{ modalCurrent.titulo }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="news-description">{{ modalCurrent.descripcion }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Cerrar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import getNews from 'src/api/getNews'

const openModal = ref(false)
const news = ref([])
const search = ref('')
const modalCurrent = ref({})
const loading = ref(false)

// Filtra las noticias basado en el término de búsqueda
const filteredNews = computed(() => {
  return news.value.filter((item) =>
    item.titulo.toLowerCase().includes(search.value.toLowerCase())
  )
})

const showModal = (modalInfo) => {
  modalCurrent.value = { ...modalInfo }
  openModal.value = true
}

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await getNews()
    news.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
})
</script>
<style>
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 24px;
  margin: 0 24px;
  margin-bottom: 24px;
}

.news-card {
  border-radius: 8px;
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

.news-description {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
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