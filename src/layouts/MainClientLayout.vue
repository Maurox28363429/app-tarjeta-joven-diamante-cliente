<script setup>
import { useQuasar } from 'quasar';
import { ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { userAuth } from 'src/composables/userAuth';
import { useUpdateUserMutation } from 'src/querys/userQuerys';
import { convertToFile, openCamera } from 'src/utils/openCamera';
import { checkFileType } from 'src/utils/checkFileType';
import QrUser from '../components/QrUser.vue';
import triangle from '../assets/images/triangulo.png';
import logo from '../assets/icons/acronimo.svg';
import { useValidateForm } from 'src/composables/useValidateForm';
import { policySchema } from 'src/schemas/policySchema';
import PocketBase from 'pocketbase';

import offersIcon from '../assets/images/offersIcon.png';
import universityIcon from '../assets/images/universityIcon.png';
import newsIcon from '../assets/images/newsIcon.png';
import pachama from '../assets/images/GifPachama.gif';

const $q = useQuasar();
const {
  userData,
  isFetchingUser,
  isFetchedAfterMountUser,
  isLoadingMembership,
  isFetchedUser,
} = userAuth();

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: {}, schema: policySchema });

watch([userData, isFetchedAfterMountUser, isFetchedUser], () => {
  if (userData.value && !isFetchingUser.value) {
    useForm.value = {
      dni: userData.value?.dni,
      dni_text: userData.value?.dni_text || '',
      beneficiario_poliza_cedula: userData.value?.beneficiario_poliza_cedula,
      beneficiario_poliza_name: userData.value?.beneficiario_poliza_name || '',
    };
  }
});

const policyRequestForm = ref(false);
const leftDrawerOpen = ref(false);
const show = ref(false);
const miniState = ref(true);
const isNoMembership = ref(false);
const isSoonExpires = ref(false);
const messageToGetMembership = ref('');

const { push, go } = useRouter();

const MESSAGES_TO_GET_MEMBERSHIP = {
  messageToNewUsers:
    'Hola! Bienvenido a Tarjeta Joven Diamante, debes seleccionar un plan para poder disfrutar de los beneficios',
  messageToRenew:
    'Hola, gracias por formar parte de Tarjeta Joven Diamante, te informamos que debes renovar tu membresía para seguir disfrutando de los beneficios.',
};

watch([isNoMembership, isLoadingMembership, userData], () => {
  const { type, status } = userData.value?.membresia || {};

  if (
    type === 'permitir_gratuita' &&
    status === 'vencida' &&
    !isLoadingMembership.value
  ) {
    messageToGetMembership.value = MESSAGES_TO_GET_MEMBERSHIP.messageToNewUsers;
  } else if (
    type === 'Prueba' &&
    status === 'vencida' &&
    !isLoadingMembership.value
  ) {
    messageToGetMembership.value = MESSAGES_TO_GET_MEMBERSHIP.messageToRenew;
  } else {
    isNoMembership.value = false;
  }
});

const { isLoading, mutateAsync } = useUpdateUserMutation();

watch(show, () => {
  const preventscreenshot = window.plugins?.preventscreenshot;
  if (preventscreenshot && window.cordova) {
    if (show.value) {
      preventscreenshot.disable(); // disable screenshot
    } else {
      preventscreenshot.enable(); // enable screenshot
    }
  }
});

watchEffect(() => {
  const { days, status } = userData.value?.membresia || {};

  if (status === 'vencida' && !isLoadingMembership.value) {
    isNoMembership.value = true;
  } else if (days <= 15 && status === 'activa') {
    isSoonExpires.value = true;
  } else {
    isNoMembership.value = false;
    isSoonExpires.value = false;
  }
});

watchEffect(() => {
  if (userData.value?.membresia?.type === 'Comprada') {
    if (
      userData.value.beneficiario_poliza_cedula === null ||
      userData.value.beneficiario_poliza_name === null ||
      userData.value.dni === null ||
      userData.value.dni_text === '' ||
      userData.value.dni_text === null
    ) {
      console.log('sin poliza');
      policyRequestForm.value = true;
    }
  }
});

const handledLogout = () => {
  localStorage.removeItem('user');
  push('/login');
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = true;
  miniState.value = !miniState.value;
};

const drawerClick = () => {
  if (miniState.value) {
    miniState.value = false;
  }
};

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'application/pdf'];

const onPhotoDataSuccessDniUser = (imageData) => {
  const img = 'data:image/jpeg;base64,' + imageData;
  useForm.value.dni = convertToFile(img);
};

const onFailDniUser = (message) => {
  console.error('Failed because: ' + message);
};

const openCameraDniUser = () => {
  openCamera(onPhotoDataSuccessDniUser, onFailDniUser);
};

const handledUpdateUser = async () => {
  validateForm();
  await mutateAsync({
    ...useForm.value,
    id: userData?.value?.id,
  });
};
const pb = new PocketBase('https://pocketbase.real.phoenixtechsa.com');
pb.collection('tarjetajoven_mensajes').subscribe('*', function (e) {
  let avatar_img = 'https://cdn.quasar.dev/img/avatar.png';
  if (e.record.type === 'ofertas') {
    avatar_img = offersIcon;
  }
  if (e.record.type === 'universidad') {
    avatar_img = universityIcon;
  }
  if (e.record.type === 'noticias') {
    avatar_img = newsIcon;
  }
  if (e.record.type === 'pachama') {
    avatar_img = pachama;
  }
  $q.notify({
    message: e.record.titulo,
    color: 'white',
    textColor: 'black',
    avatar: avatar_img,
    actions: [
      {
        label: 'Ver',
        color: 'black',
        handler: () => {
          const id = e.record.id_post;
          console.log(id);
          if (e.record.type === 'universidad') {
            push('cliente/OffersForUniversitys/Panamá');
          }
          if (e.record.type === 'noticias') {
            push('cliente/OffersForUniversitys/Panamá');
          }
          if (e.record.type === 'ofertas') {
            push('cliente/OffersForUniversitys/Panamá');
          }
          if (e.record.type === 'pachama') {
            push('cliente/OffersForUniversitys/Panamá');
          }
        },
      },
    ],
  });
});
</script>

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
        <div @click="go(-1)">
          <q-icon
            name="arrow_back"
            size="md"
            color="dark"
            class="cursor-pointer"
          />
        </div>
        <q-toolbar-title class="row items-center">
          <q-img
            :src="logo"
            spinner-color="dark"
            @click="push('/cliente/home')"
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
                v-if="userData?.membresia?.status === 'activa'"
                class="text-weight-medium text-subtitle2 text-grey-6 q-ma-none"
              >
                Quendan: {{ userData?.membresia?.days }} días
              </p>
              <p
                v-if="userData?.membresia?.status === 'vencida'"
                class="text-weight-medium text-subtitle2 text-grey-6 q-ma-none"
              >
                Membresia vencida
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
          @click.prevent="handledLogout"
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
            ¡Hola, {{ userData?.name + ' ' + userData?.last_name }}!
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
      <q-dialog v-model="policyRequestForm" persistent :maximized="true">
        <q-card class="full-width full-height">
          <q-card-section>
            <div align="center">
              <q-img src="favicon.ico" width="100px" height="auto" />
            </div>
            <br />

            <div class="text-h6 text-center">
              Coloca tu beneficiario de poliza
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
              @submit.prevent="handledUpdateUser"
              class="q-pt-none q-gutter-lg"
            >
              <div>
                Foto de tu cédula o pasaporte
                <div
                  class="q-ma-none label-large no-wrap full-width row q-gutter-md"
                >
                  <q-file
                    outlined
                    class="full-width"
                    v-model="useForm.dni"
                    name="dni"
                    @blur="validatInput('dni')"
                    @keypress="validatInput('dni')"
                    label="Subir archivo.jpg/.png/.pdf"
                    :filter="checkFileType(ACCEPTED_TYPES_FOR_DNI)"
                    max-files="1"
                  >
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" @click.stop.prevent />
                    </template>
                  </q-file>

                  <q-btn
                    class="cordova-only"
                    color="primary"
                    icon="camera_alt"
                    @click="openCameraDniUser"
                  />
                </div>
                <p class="text-error" v-if="!!validateMessage.errors.dni">
                  {{ validateMessage.errors.dni }}
                </p>
              </div>

              <div>
                <label>
                  Introduce tu cédula o pasaporte
                  <q-input
                    placeholder="76757667"
                    outlined
                    autocomplete="nope"
                    name="dni_text"
                    v-model="useForm.dni_text"
                    autofocus
                    @blur="validatInput('dni_text')"
                    @keypress="validatInput('dni_text')"
                  />
                  <p
                    class="text-error"
                    v-if="!!validateMessage.errors.dni_text"
                  >
                    {{ validateMessage.errors.dni_text }}
                  </p>
                </label>
              </div>

              <div>
                <label>
                  Cedula de tu beneficiario
                  <q-input
                    placeholder="76757667"
                    outlined
                    autocomplete="nope"
                    name="beneficiario_poliza_cedula"
                    v-model="useForm.beneficiario_poliza_cedula"
                    @blur="validatInput('beneficiario_poliza_cedula')"
                    @keypress="validatInput('beneficiario_poliza_cedula')"
                    autofocus
                  />
                  <p
                    class="text-error"
                    v-if="!!validateMessage.errors.beneficiario_poliza_cedula"
                  >
                    {{ validateMessage.errors.beneficiario_poliza_cedula }}
                  </p>
                </label>
              </div>
              <div>
                <label>
                  Nombrel del beneficiario
                  <q-input
                    placeholder="Juan Perez"
                    outlined
                    autocomplete="nope"
                    name="beneficiario_poliza_name"
                    v-model="useForm.beneficiario_poliza_name"
                    @blur="validatInput('beneficiario_poliza_name')"
                    @keypress="validatInput('beneficiario_poliza_name')"
                  />
                  <p
                    class="text-error"
                    v-if="!!validateMessage.errors.beneficiario_poliza_name"
                  >
                    {{ validateMessage.errors.beneficiario_poliza_name }}
                  </p>
                </label>
              </div>
              <div class="full-width row justify-center">
                <q-btn
                  color="primary"
                  label="Agregar datos"
                  v-close-popup
                  :loading="isLoading"
                  type="submit"
                  :disable="!validateMessage.isvalid"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isNoMembership" persistent>
        <q-card
          class="column justify-center"
          style="width: 90vw; height: 400px"
        >
          <q-card-section align="center">
            <div align="center">
              <q-img src="favicon.ico" width="100px" height="auto" />
            </div>
            <br />
            <p class="text-h6 text-center">{{ messageToGetMembership }}</p>
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn
              color="primary"
              label="ir a membresias"
              @click="push('/memberships')"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isSoonExpires">
        <q-card
          class="column justify-center"
          style="width: 90vw; min-height: 400px"
        >
          <q-card-section align="center">
            <div align="center">
              <q-img src="favicon.ico" width="100px" height="auto" />
            </div>
            <br />
            <p class="text-h6 text-center">
              {{
                `Hola! Gracias por formar parte de Tarjeta Joven Diamante, te informamos que debes renovar tu membresía para seguir disfrutando de los beneficios, te quedan ${userData.membresia.days} días para renovar`
              }}
            </p>
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn
              color="primary"
              label="ir a membresias"
              @click="push('/memberships')"
            />
            <q-btn color="primary" v-close-popup label="Cerrar" />
          </q-card-actions>
        </q-card>
      </q-dialog>

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

      <router-view />
    </q-page-container>

    <div class="q-px-sm q-py-lg">
      <div class="qrButton">
        <q-btn
          round
          @click="show = true"
          color="primary"
          icon="qr_code"
          :disable="userData?.membresia?.status === 'vencida'"
        />
      </div>
    </div>
    <q-tabs
      dense
      style="z-index: 100"
      class="menuMobile bg-primary text-white justify-center full-width fixed-bottom"
      align="center"
      narrow-indicator
    >
      <q-route-tab
        name="home"
        label="Home"
        color="white"
        class="text-capitalize q-px-none full-width"
        icon="home"
        to="/cliente/home"
        exact
      />
      <q-route-tab
        name="misCompras"
        label="Mis compras"
        color="white"
        class="text-capitalize q-px-none full-width"
        icon="shopping_basket"
        to="/cliente/transactionsTable"
        exact
      />
      <q-route-tab
        name="Ofertas"
        label="Ofertas"
        color="white"
        class="text-capitalize q-px-none full-width"
        icon="sell"
        to="/cliente/Offers"
      />
      <q-route-tab
        name="news"
        label="Noticias"
        color="white"
        class="text-capitalize q-px-none full-width"
        icon="newspaper"
        to="/cliente/news"
      />
    </q-tabs>
    <q-img :src="triangle" class="trianguloTop" spinner-color="dark" />
    <q-img :src="triangle" class="trianguloBottom" spinner-color="dark" />
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
