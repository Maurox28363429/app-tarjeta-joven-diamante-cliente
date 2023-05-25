<script setup>
import { useQuasar } from "quasar";
import { ref, computed, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { userAuth } from "src/composables/userAuth";
import { useUpdateUserMutation } from "src/querys/userQuerys";
import { convertToFile, openCamera } from "src/utils/openCamera";
import QrUser from "../components/QrUser.vue";
import triangle from "../assets/images/triangulo.png";
import qrIcon from "./../assets/images/qr.jpg";
import logo from "../assets/icons/acronimo.svg";

const $q = useQuasar();
const { userData } = userAuth();

const dni = ref("");
const policyRequestForm = ref(false);
const beneficiario_poliza_cedula = ref("");
const beneficiario_poliza_name = ref("");
const leftDrawerOpen = ref(false);
const show = ref(false);
const miniState = ref(true);
const isNoMembership = ref(false);
const isSoonExpires = ref(false);

const { push, go } = useRouter();

const messageToGetMembership = computed(() => {
  if (
    userData.value?.membresia?.type === "permitir_gratuita" &&
    userData.value?.membresia?.status === "vencida"
  ) {
    return "Hola! Bienvenido a Tarjeta Joven Diamante, debes seleccionar un plan para poder disfrutar de los beneficios";
  } else if (
    userData.value?.membresia?.type === "Prueba" &&
    userData.value?.membresia?.status === "vencida"
  ) {
    return "Hola, gracias por formar parte de Tarjeta Joven Diamante, te informamos que debes renovar tu membresía para seguir disfrutando de los beneficios.";
  } else {
    return "";
  }
});

const { isLoading, mutateAsync } = useUpdateUserMutation();

watch(show, () => {
  if (window.plugins?.preventscreenshot && window.cordova) {
    if (show.value) {
      window.plugins.preventscreenshot.disable();
      console.log("disable screenshot");
    } else {
      window.plugins.preventscreenshot.enable();
      console.log("enable screenshot");
    }
  }
});

watchEffect(() => {
  if (
    userData.value?.membresia?.type === "permitir_gratuita" ||
    userData.value?.membresia?.status === "vencida"
  ) {
    isNoMembership.value = true;
  } else if (
    userData.value?.membresia?.days <= 15 &&
    userData.value?.membresia?.status === "activa"
  ) {
    isSoonExpires.value = true;
  } else {
    isNoMembership.value = false;
    isSoonExpires.value = false;
  }
});

watchEffect(() => {
  if (userData.value?.membresia?.type === "Comprada") {
    console.log("membresia comprada");
    if (
      userData.value.beneficiario_poliza_cedula === null ||
      userData.value.beneficiario_poliza_name === null ||
      userData.value.dni === null
    ) {
      console.log("sin poliza");
      policyRequestForm.value = true;
    }
  }
});

const handledLogout = (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  push("/login");
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = true;
  miniState.value = !miniState.value;
};

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false;

    e.stopPropagation();
  }
};

const checkFileType = (files) => {
  return files.filter(
    (file) =>
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "application/pdf"
  );
};

const onPhotoDataSuccessDniUser = (imageData) => {
  const img = "data:image/jpeg;base64," + imageData;
  dni.value = convertToFile(img);
};

const onFailDniUser = (message) => {
  console.error("Failed because: " + message);
};

const openCameraDniUser = () => {
  openCamera(onPhotoDataSuccessDniUser, onFailDniUser);
};

const handledUpdateUser = async () => {
  await mutateAsync({
    id: userData?.value?.id,
    data: {
      beneficiario_poliza_cedula: beneficiario_poliza_cedula.value,
      beneficiario_poliza_name: beneficiario_poliza_name.value,
      dni: dni.value,
    },
  });
};
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
      <q-dialog v-model="policyRequestForm" persistent :maximized="true">
        <q-card class="full-width full-height">
          <q-card-section>
            <div align="center">
              <q-img src="favicon.ico" width="100px" height="auto" />
            </div>
            <br />
            <div class="text-h6 text-center">
              Coloca tu beneficiaro de poliza
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-lg">
            <div>
              Cédula / pasaporte
              <div
                class="q-ma-none label-large no-wrap full-width row q-gutter-md"
              >
                <q-file
                  outlined
                  dense
                  class="full-width"
                  v-model="dni"
                  label="archivo.jpg/.png/.pdf"
                  :filter="checkFileType"
                  max-files="1"
                >
                </q-file>

                <q-btn
                  class="cordova-only"
                  color="primary"
                  icon="camera"
                  @click="openCameraDniUser"
                />
              </div>
            </div>

            <div>
              <q-input
                placeholder="Cedula de tu beneficiario"
                dense
                outlined
                v-model="beneficiario_poliza_cedula"
                autofocus
              />
            </div>
            <div>
              <q-input
                placeholder="Nombrel del beneficiario"
                dense
                outlined
                v-model="beneficiario_poliza_name"
              />
            </div>
          </q-card-section>

          <q-card-actions align="center" class="text-primary">
            <q-btn
              color="primary"
              label="Agregar datos"
              v-close-popup
              :loading="isLoading"
              @click="handledUpdateUser"
              :disable="
                beneficiario_poliza_cedula != '' &&
                beneficiario_poliza_name != '' &&
                dni != ''
                  ? false
                  : true
              "
            />
          </q-card-actions>
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
          :disable="userData?.membresia?.status === 'vencida'"
        >
          <q-img :src="qrIcon" width="24px" height="24px" alt="qr icon" />
        </q-btn>
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
