<template>
  <div class="full-width full-height row justify-center items-center">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="row q-mb-md items-center">
        <q-avatar size="80px" class="q-mr-md">
          <q-img :src="user.img_url" spinner-color="dark" />
        </q-avatar>
        <div>
          <p class="q-ma-none">{{ user.name + " " + user.last_name }}</p>
          <p class="q-ma-none">{{ user.email }}</p>
        </div>
      </div>
      <q-card>
        <q-list bordered padding>
          <q-item clickable v-ripple to="/empresa/account/profile">
            <q-item-section>
              <q-item-label>Ver perfil</q-item-label>
              <q-item-label caption>
                Toda la información relacionada de su perfil puede ser editada y
                la puede visualizar.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label
                >Contactanos a
                <span class="text-weight-bold"
                  >informacion@tarjetajovendiamante.com</span
                ></q-item-label
              >
              <q-item-label caption>
                Estamos para ayudarte, si tienes alguna duda o problema con tu
                cuenta puedes contactarnos.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="handledLogout">
            <q-item-section>
              <q-item-label class="text-negative">Cerrar sesión</q-item-label>
              <q-item-label caption>
                Cerrar la sesión y volver a la pagina de inicio.
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
import { userAuth } from 'src/composables/userAuth'

const { user } = userAuth()

const router = useRouter()

const handledLogout = (e) => {
  e.preventDefault()
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
