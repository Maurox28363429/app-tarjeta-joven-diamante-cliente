<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="q-py-sm text-white"
      style="
        height: 60px;
        background: #f8fdff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
          0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      "
    >
      <q-toolbar class="row items-center">
        <q-btn
          class="menu"
          dense
          flat
          round
          icon="menu"
          color="dark"
          @click="toggleLeftDrawer"
        />
        <div @click="goBack">
          <q-icon
            name="arrow_back"
            size="md"
            color="dark"
            class="cursor-pointer"
          />
        </div>
        <q-toolbar-title class="row items-center">
          <q-img
            src="../assets/icons/acronimo.svg"
            spinner-color="dark"
            @click="goHome"
            style="height: 32px; max-width: 74px; cursor: pointer"
          />
        </q-toolbar-title>
        <q-btn
          style="height: 35px; width: 35px; display: none"
          fill
          round
          icon="shopping_cart"
          color="secondary"
        />
        <router-link to="/cliente/account" class="cursor-pointer">
          <q-avatar size="42px" class="q-ml-md">
            <q-img :src="userData?.img_url" spinner-color="dark" />
          </q-avatar>
        </router-link>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
      :width="214"
      :breakpoint="700"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <div
        class="q-mini-drawer-hide absolute"
        style="top: 15px; right: -17px; z-index: 20"
      >
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item>
            <q-item-section>
              <p class="text-weight-bold text-h6 q-ma-none">
                Plan {{ userData?.membresia?.type }}
              </p>
              <p
                class="text-weight-medium text-subtitle2 text-grey-6 q-ma-none"
              >
                Quendan: {{ userData?.membresia?.days }} días
              </p>
            </q-item-section>
          </q-item>
          <q-separator inset v-show="!miniState" />
          <q-item clickable v-ripple to="/cliente/home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/transactionsTable">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <q-item-section>Mis compras</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/promotions">
            <q-item-section avatar>
              <q-icon name="newspaper" />
            </q-item-section>

            <q-item-section>Promociones</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/account">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>Mi perfil</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/Offers">
            <q-item-section avatar>
              <q-icon name="sell" />
            </q-item-section>

            <q-item-section>Ofertas</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/memberships">
            <q-item-section avatar>
              <q-icon name="rocket_launch" />
            </q-item-section>

            <q-item-section>Membresías</q-item-section>
          </q-item>
        </q-list>
        <div
          @click="handledLogout"
          class="row justify-center full-width full-height body-small"
        >
          <q-btn
            icon="power_settings_new"
            :label="!miniState ? 'Cerrar sesión' : ''"
            text-color="white"
            class="body-small"
            style="position: absolute; bottom: 20px; background-color: #ba1a1a"
          />
        </div>
      </q-scroll-area>

      <div v-show="!miniState" class="absolute-top" style="height: 150px">
        <div class="column items-center absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="userData?.img_url" />
          </q-avatar>
          <div class="text-weight-bold">
            ¡Hola, {{ userData?.name + " " + userData?.last_name }}!
          </div>
          <div>
            <p
              class="text-center"
              style="text-overflow: ellipsis; overflow: hidden; width: 196px"
            >
              {{ userData?.email }}
            </p>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container style="background: #f8fdff">
      <q-dialog v-model="prompt" persistent :maximized="true">
        <q-card style="width: 100%; height: 100%">
          <q-card-section>
            <div align="center">
              <img src="favicon.ico" style="width: 100px; height: auto" />
            </div>
            <br />
            <div class="text-h6 text-center">
              Coloca tu beneficiaro de poliza
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-y-md">
            <div
              class=" full-width no-wrap q-gutter-xs"
            >
            <label class="label-large">
                  Foto Cédula / pasaporte
            </label>
              <div class="label-large" style="min-width: 220px">
                <q-file
                  outlined
                  class="full-width"
                  bottom-slots
                  v-model="dni"
                  label="Cédula / pasaporte"
                  :filter="checkFileType"
                  max-files="1"
                >
                </q-file>
              </div>
              <div class="cordova-only">
                <q-btn
                  label="Tomar foto"
                  color="primary"
                  class="full-height"
                  @click="openCameraDniUser"
                />
              </div>
            </div>
            <div>
              <div
                class=" full-width no-wrap q-gutter-xs"
              >
              <label class="label-large">
                Poliza Beneficiario: Cédula / pasaporte
                <q-input
                  type="text"
                  placeholder="Cédula / pasaporte del beneficiario"
                  v-model="beneficiario_poliza_cedula"
                  name="beneficiario_poliza_cedula"
                  class="full-height"
                  style="width:100%;"
                  dense
                  outlined
                />
              </label>
              </div>
            </div>
            <div
              class=" full-width no-wrap q-gutter-xs"
            >
            <label class="label-large">
              Poliza Beneficiario: Nombre del beneficiario
                <q-input
                  class="full-height"
                  style="width:100%;"
                  placeholder="Nombrel del beneficiario"
                  dense
                  outlined
                  v-model="beneficiario_poliza_name"
                />
            </label>
            </div>
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn
              color="primary"
              label="Agregar datos"
              v-close-popup
              :loading="isLoading"
              @click="handledUpdateUser"
              :disable="!disablePolicy"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <router-view />
    </q-page-container>
    <q-dialog
      v-model="show"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <QrUser />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-px-sm q-py-lg">
      <div class="qrButton">
        <q-btn
          round
          @click="handleModal"
          color="primary"
          :disable="userData?.membresia?.status == 'vencida' ? true : false"
        >
          <img
            src="./../assets/images/qr.jpg"
            style="width: 24px; height: 24px"
          />
        </q-btn>
      </div>
    </div>
    <q-tabs
      style="position: fixed; z-index: 100; bottom: 0; width: 100%"
      dense
      class="menuMobile bg-primary text-white justify-center"
      align="center"
      narrow-indicator
    >
      <router-link
        to="/cliente/home"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="home"
          label="Home"
          color="white"
          class="text-capitalize q-px-none"
          icon="home"
        />
      </router-link>
      <router-link
        to="/cliente/transactionsTable"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="misCompras"
          label="Mis compras"
          color="white"
          class="text-capitalize q-px-none"
          icon="shopping_basket"
        />
      </router-link>
      <router-link
          to="/cliente/news"
          style="text-decoration: none; color: #ffff; width: 100%; margin: none"
        >
          <q-tab
            name="news"
            label="Noticias"
            color="white"
            class="text-capitalize q-px-none"
            icon="newspaper"
          />
        </router-link>
      <router-link
        to="/cliente/Offers"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="Ofertas"
          label="Ofertas"
          color="white"
          class="text-capitalize q-px-none"
          icon="sell"
        />
      </router-link>
      <router-link
        to="/cliente/promotions"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="Promociones"
          label="Promociones"
          color="white"
          class="text-capitalize q-px-none"
          icon="newspaper"
        />
      </router-link>
    </q-tabs>
    <UpdateMembershipModal
      :showModal="showModalNew"
      description="Obten 3 días de pueba con el plan free, y recibe ofertas especiales"
    />
    <UpdateMembershipModal
      :showModal="showModalIsExpired"
      description="Renueva el plan, y recibe ofertas especiales"
    />
    <q-img
      src="../assets/images/triangulo.png"
      spinner-color="dark"
      class="trianguloTop"
    />
    <q-img
      src="../assets/images/triangulo.png"
      class="trianguloBottom"
      spinner-color="dark"
    />
  </q-layout>
</template>

<style>
aside {
  position: fixed !important;
}

.trianguloBottom {
  height: 140px;
  max-width: 200px;
  position: fixed;
  bottom: 0px;
  left: 16px;
  z-index: 98;
  clip-path: polygon(0 0, 83% 0, -55% 100%);
  transform: rotate(-0.25turn);
}

.trianguloTop {
  height: 150px;
  max-width: 200px;
  position: fixed;
  top: 84px;
  right: -49px;
  clip-path: polygon(-32% 0, 94% 0, -70% 99%);
  z-index: 100;
  transform: rotate(90deg);
}

.logoutButton {
  background: #ba1a1a;
}

.menu {
  display: flex;
  align-items: center;
}

.menuMobile {
  display: none;
}

.qrButton {
  position: fixed;
  z-index: 100;
  right: 24px;
  bottom: 6px;
}

@media (max-width: 700px) {
  .menu {
    display: none;
  }
  .menuMobile {
    display: block;
  }

  .trianguloBottom {
    bottom: 36px;
    left: -60px;
    height: 90px;
  }
  .qrButton {
    bottom: 64px;
  }
}
</style>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { userAuth } from 'src/composables/userAuth'
import UpdateMembershipModal from '../components/UpdateMembershipModal.vue'
// import format from 'src/utils/date'
import QrUser from '../components/QrUser.vue'
import { useQuasar } from 'quasar'
import { convertToFile, openCamera } from 'src/utils/openCamera'
import { useUpdateUserMutation } from 'src/querys/userQuerys'
const $q = useQuasar()

const { userData } = userAuth()

const leftDrawerOpen = ref(false)
const router = useRouter()
const show = ref(false)

const { isLoading, mutateAsync } = useUpdateUserMutation()

watch(show, () => {
  if (window.plugins?.preventscreenshot && window.cordova) {
    if (show.value) {
      window.plugins.preventscreenshot.disable()
      console.log('disable screenshot')
    } else {
      window.plugins.preventscreenshot.enable()
      console.log('enable screenshot')
    }
  }
})

const showModalIsExpired = computed(
  () => userData?.value?.membresia?.status === 'vencida' && userData?.value?.membresia?.type === 'Comprada'
)

const showModalNew = computed(
  () =>
    userData?.value?.membresia?.type === 'permitir_gratuita'
)
if (userData?.value?.membresia?.type === 'permitir_gratuita') {
  router.push('/memberships')
}
const handleModal = () => {
  show.value = true
}

const miniState = ref(true)

const handledLogout = (e) => {
  e.preventDefault()
  localStorage.removeItem('user')
  router.push('/login')
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = true
  miniState.value = !miniState.value
}

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false

    e.stopPropagation()
  }
}

// para el inicio comprobar si tiene beneficiario
const prompt = ref(false)

const dni = ref('')
const beneficiario_poliza_cedula = ref('')
const beneficiario_poliza_name = ref('')

const disablePolicy = computed(
  () =>
    beneficiario_poliza_cedula.value !== '' &&
    beneficiario_poliza_name.value !== '' &&
    dni.value !== ''
)
if (userData.value?.membresia?.type === 'Comprada' || userData.value?.membresia?.type === 'comprada') {
  if (
    userData.value?.beneficiario_poliza_cedula === null ||
    userData.value?.beneficiario_poliza_name === null ||
    userData.value?.dni === null ||
    userData.value?.beneficiario_poliza_cedula === '' ||
    userData.value?.beneficiario_poliza_name === '' ||
    userData.value?.dni === ''
  ) {
    prompt.value = true
  }
}
watch(userData, () => {
  if (userData.value?.membresia?.type === 'Comprada' || userData.value?.membresia?.type === 'comprada') {
    console.log('membresia comprada')
    if (
      userData.value?.beneficiario_poliza_cedula === null ||
      userData.value?.beneficiario_poliza_name === null ||
      userData.value?.dni === null ||
      userData.value?.beneficiario_poliza_cedula === '' ||
      userData.value?.beneficiario_poliza_name === '' ||
      userData.value?.dni === ''
    ) {
      console.log('sin poliza')
      prompt.value = true
    }
  }
})
const checkFileType = (files) => {
  return files.filter(
    (file) =>
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'application/pdf'
  )
}

const onPhotoDataSuccessDniUser = (imageData) => {
  const img = 'data:image/jpeg;base64,' + imageData
  dni.value = convertToFile(img)
}

const onFailDniUser = (message) => {
  alert('Failed because: ' + message)
}

const openCameraDniUser = () => {
  openCamera(onPhotoDataSuccessDniUser, onFailDniUser)
}

/* const onPhotoDataSuccessDniBeneficiary = (imageData) => {
  const img = 'data:image/jpeg;base64,' + imageData
  beneficiario_poliza_cedula.value = convertToFile(img)
} */

/* const onFailDniUserBeneficiary = (message) => {
  alert('Failed because: ' + message)
} */

/* const openCameraDniUserBeneficiary = () => {
  openCamera(onPhotoDataSuccessDniBeneficiary, onFailDniUserBeneficiary)
} */
const handledUpdateUser = async () => {
  await mutateAsync({
    id: userData?.value?.id,
    data: {
      beneficiario_poliza_cedula: beneficiario_poliza_cedula.value,
      beneficiario_poliza_name: beneficiario_poliza_name.value,
      dni: dni.value
    }
  })
}

const goHome = () => {
  router.push('/cliente/home')
}

const goBack = () => {
  router.go(-1)
}
</script>
