<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { userAuth } from 'src/composables/userAuth';

const { userData, isLoadingUser } = userAuth();

const props = defineProps({
  user: {
    type: String,
    required: true,
  },
});

const isBusiness = props.user === 'business';

const router = useRouter();

const handledLogout = (e) => {
  e.preventDefault();
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<template>
  <q-inner-loading :showing="isLoadingUser">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <div v-if="!isLoadingUser">
    <div class="full-width full-height row justify-center items-center">
      <div class="q-pa-md" style="max-width: 400px">
        <div class="row q-mb-md items-center">
          <q-avatar size="80px" class="q-mr-md">
            <q-img :src="userData?.img_url" spinner-color="dark" />
          </q-avatar>
          <div>
            <p class="q-ma-none">
              {{ userData.name + ' ' + userData.last_name }}
            </p>
            <p class="q-ma-none">{{ userData.email }}</p>
          </div>
        </div>
        <q-card>
          <q-list bordered padding>
            <q-item
              clickable
              v-ripple
              :to="`/${isBusiness ? 'empresa' : 'cliente'}/account/profile`"
            >
              <q-item-section>
                <q-item-label>Ver perfil</q-item-label>
                <q-item-label caption>
                  Toda la información relacionada de su perfil puede ser editada
                  y la puede visualizar.
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/memberships" v-if="!isBusiness">
              <q-item-section>
                <q-item-label>Subir membresías</q-item-label>
                <q-item-label caption>
                  Subir de plan es muy facil, solo debe seleccionar el plan que
                  desea y subir la información requerida.
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label
                  >Contactanos a
                  <span class="text-weight-bold">
                    informacion@tarjetajovendiamante.com</span
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
  </div>
</template>
