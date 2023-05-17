<template>
  <div v-if="!loading">
    <div
      class="column items-center justify-center items-center"
      style="min-height: 327px; width: 100%"
    >
      <video
        id="video"
        v-if="staredScan"
        style="width: 100%; height: 327px; object-fit: cover"
        autoplay
      ></video>
      <p v-if="!staredScan" class="q-ma-none q-pa-none">Haz click a scanear</p>
      <q-select
        class="q-my-md q-px-md"
        outlined
        v-model="selectedDeviceId"
        :options="videoInputDevices"
        label="camaras"
      />
    </div>
    <q-card-actions align="center">
      <q-btn
        size="md"
        class="button"
        @click="startDecode"
        label="scanear"
        color="primary"
      />
      <q-btn
        size="md"
        class="button"
        @click="reset"
        label="reset"
        color="secondary"
      />
    </q-card-actions>
  </div>
  <q-spinner color="white" size="xs" />
  <q-inner-loading
    :showing="loading"
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup>
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { ref, onMounted, defineEmits, defineProps } from "vue";
import { useToast } from "src/composables/useToast";
import { useRouter } from "vue-router";
import { userCart } from "src/stores/userCart";

defineProps({
  closeModal: {
    type: Boolean,
  },
});

const emits = defineEmits(["close-modal"]);
const router = useRouter();

const client = userCart();
const loading = ref(false);

const { triggerWarning } = useToast();

const selectedDeviceId = ref("");
const codeReader = ref(null);
const videoInputDevices = ref([]);
const resultText = ref("");
const permision = ref(false);
const staredScan = ref(false);

console.log(
  videoInputDevices.value,
  "videoInputDevices",
  selectedDeviceId.value,
  "selectedDeviceId"
);

onMounted(() => {
  addPermision();
  codeReader.value = new BrowserMultiFormatReader();

  codeReader.value
    .listVideoInputDevices()
    .then((videoInputDevicesSelect) => {
      videoInputDevices.value = videoInputDevicesSelect.map((element) => {
        return { ...element, value: element.deviceId, label: element.label };
      });

      selectedDeviceId.value = videoInputDevices.value[0];
    })
    .catch((err) => {
      console.error(err);
    });
});

async function startDecode() {
  try {
    staredScan.value = true;

    codeReader.value.decodeFromVideoDevice(
      selectedDeviceId.value.value,
      "video",
      async (result, err) => {
        if (result) {
          resultText.value = result.text;
          loading.value = true;

          if (Number(result.text) === "NaN") {
            triggerWarning("El qr no corresponde a un cliente");
          }

          try {
            const getClient = await client.setClient(Number(result.text));
            router.push("/empresa/create-order");
            emits("close-modal");
            console.log("Cliente asignado correctamente", result.text);
            if (getClient.membresia?.status !== "activa") {
              triggerWarning("Usuario no tiene una membresia activa");
            }
          } catch (error) {
            console.error("Error al asignar el cliente:", error);

            triggerWarning(client.client.message);
            console.log(client.client.message);
          } finally {
            loading.value = false;
            reset();
          }
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
          resultText.value = err;
        }
      }
    );

    console.log(
      `Started continous decode from camera with id ${selectedDeviceId.value.value}`
    );
  } catch (err) {
    console.error(err);
  }
}

function reset() {
  codeReader.value.reset();
  resultText.value = "";
}

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
</script>
