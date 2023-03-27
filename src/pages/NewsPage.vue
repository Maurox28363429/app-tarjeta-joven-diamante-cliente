<template>
  <p class="q-ml-lg q-mt-lg text-h4 text-weight-medium">Novedades</p>
  <div class="full-width full-height row justify-center q-mt-lg">
    <q-input
      v-model="search"
      outlined
      type="search"
      label="Buscar novedades"
      color="primary"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div
    class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg"
  >
    <div
      style="min-height: 250px; width: 250px"
      v-for="items in news"
      :key="items.id"
    >
      <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-section>
          <div class="text-h6">{{ items.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ items.description }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
// make a array of object of news,the news should have title ando description

const news = [
  {
    id: 1,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 2,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },
  {
    id: 3,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 4,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 5,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 6,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 7,
    title: 'Our Changing Planet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]
</script>
