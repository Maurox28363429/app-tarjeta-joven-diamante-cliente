<template>
  <div class="column justify-center" style="min-height: 200px">
    <div>
      <qrcode-stream
        v-if="permision || !window?.cordova"
        @decode="onDecode"
        @init="onInit"
        @detect="onDetect"
        @error="onError"
      ></qrcode-stream>
    </div>
    <q-inner-loading
      :showing="loading || visible"
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <div
      v-if="!permision"
      class="full-width q-px-md full-height column justify-center items-center"
    >
      <p class="title-medium text-center">
        Activa los permisos de la camara para activar el lector de QR
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from "vue";
import { useToast } from "src/composables/useToast";
import { userCart } from "src/stores/userCart";
import { useRouter } from "vue-router";
import { userAuth } from "src/composables/userAuth";

defineProps({
  closeModal: {
    type: Object,
  },
});

const emits = defineEmits(["close-modal"]);

const router = useRouter();
const { user } = userAuth();

const client = userCart();

const visible = ref(false);
const loading = ref(false);

const permision = ref(false);

const { triggerWarning } = useToast();

function addPermision() {
  if (
    window?.cordova &&
    window?.cordova.plugins &&
    window?.cordova.plugins.permissions
  ) {
    // Solicitar permiso de cámara
    const permissions = window.cordova.plugins.permissions;
    console.log("estoy en cordova", permissions);
    permissions.requestPermission(
      permissions.CAMERA,
      function (status) {
        if (status.hasPermission) {
          // El permiso ha sido concedido
          permision.value = true;
          console.log("tiene permiso");
        } else {
          // El permiso ha sido denegado
          console.log("No tiene permiso");
          triggerWarning(
            "El permiso de la cámara fue denegado. Por favor, permite el acceso desde la configuración del dispositivo."
          );
          permision.value = false;
        }
      },
      function (error) {
        console.log("error", error);
        // Error al solicitar el permiso
        console.error("Error al solicitar el permiso de cámara");
        triggerWarning("Los permisos para la camara estan desactivados");
        permision.value = false;
      }
    );
  }
}

onMounted(() => {
  addPermision();
});

const onDecode = async (decodedString) => {
  loading.value = true;
  try {
    await client.setClient(decodedString);
    router.push("/empresa/create-order");
    emits("close-modal");
  } catch (error) {
    console.error("Error al asignar el cliente:", error);
  } finally {
    loading.value = false;
  }
};

const onInit = (promise) => {
  visible.value = true;
  promise
    .then(() => {
      permision.value = true;
    })
    .catch((error) => {
      console.error("Error al inicializar el lector de QR:", error);
      triggerWarning("Los permisos para la camara estan desactivados");
      permision.value = false;
    })
    .finally(() => {
      visible.value = false;
    });
};

const onDetect = () => {
  console.log("Código QR detectado.");
  if (!user.value.membresia) {
    triggerWarning("Usuario no tiene una membresia activa");
  }
};

const onError = (error) => {
  console.error("Error al escanear el código QR:", error);
};
</script>
