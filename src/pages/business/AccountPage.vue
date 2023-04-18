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
                Toda la informacion relacionada de su perfil puede ser editada y
                la puede visualizar.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label
                >Contactanos a
                <span class="text-weight-bold">informacionrmacion@tarjetajovendiamante.com</span></q-item-label>
              <q-item-label caption>
                Estamos para ayudarte, si tienes alguna duda o problema con tu
                cuenta puedes contactarnos.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="handledLogout">
            <q-item-section>
              <q-item-label class="text-negative">Cerrar sección</q-item-label>
              <q-item-label caption>
                Cerrar sección y volver a la pagina de inicio.
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { userAuth } from "src/composables/userAuth";

const { user } = userAuth();

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const handledLogout = (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  router.push("/login");
};
</script>
