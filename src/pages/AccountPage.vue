<template>
  <div class="full-width full-height row justify-center items-center">
    <div @click="goBack" class="full-width q-pl-md q-pt-md">
      <q-icon name="arrow_back" size="md" color="dark" class="cursor-pointer" />
    </div>
    <div class="q-pa-md" style="max-width: 400px">
      <div class="row q-mb-md items-center">
        <q-avatar size="80px" class="q-mr-md">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div>
          <p class="q-ma-none">{{ user.name }}</p>
          <p class="q-ma-none">{{ user.profile.Email }}</p>
        </div>
      </div>
      <q-card>
        <q-list bordered padding>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Ver perfil</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Subir membresías</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Contactar a soporte</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-negative">Cerrar sección</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const user = {
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
  profile: {
    Email: 'johndoe@example.com',
    Phone: '+1 (555) 123-4567',
    Location: 'New York, USA',
    Occupation: 'Software Developer',
    Bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'
  }
}
const goBack = () => {
  console.log('go back')
  router.go(-1)
}
</script>
