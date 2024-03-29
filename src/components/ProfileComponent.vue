<script setup>
import { ref, watch, defineProps, computed, watchEffect } from 'vue';
import { userAuth } from 'src/composables/userAuth';
import { useValidateForm } from 'src/composables/useValidateForm';
import { updateProfileShema } from 'src/schemas/updateProfileShema';
import { useUpdateUserMutation } from 'src/querys/userQuerys';
import { useGetStates } from 'src/querys/offersQuerys';
import { convertToFile, openCamera } from 'src/utils/openCamera';
import { checkFileType } from 'src/utils/checkFileType';
import { PARENTAGE } from 'src/shared/constansts/parentage';

const {
  updatedUser,
  userData,
  isLoadingUser,
  isFetchingUser,
  isFetchedAfterMountUser,
  isFetchedUser,
} = userAuth();

const showDni = ref(false);

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'application/pdf'];

const props = defineProps({
  user: {
    type: String,
    required: true,
  },
});

const { data } = useGetStates({});

const provinceOptions = computed(() =>
  data.value?.data?.map(({ name }) => name)
);

const isBusiness = props.user === 'business';

let genderCurrent = { label: '', value: '' };

const GENDER_OPTIONS = [
  { label: 'Mujer', value: 0 },
  { label: 'Hombre', value: 1 },
];

const fileInput = ref(userData.value?.img_url ?? '');

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: {}, schema: updateProfileShema });

watchEffect(() => {
  if (useForm.value?.provincia?.length > 2 && userData.value) {
    useForm.value?.provincia.pop();
  }
});

watch([userData, isFetchedAfterMountUser, isFetchedUser], () => {
  if (userData.value && !isFetchingUser.value) {
    genderCurrent = GENDER_OPTIONS.find(
      (item) => item.value === Number(userData.value?.sex)
    );
    fileInput.value = userData.value?.img_url;
    useForm.value = {
      provincia: Array.isArray(userData.value.provincia)
        ? userData.value.provincia
        : JSON.parse(userData?.value?.provincia),
      name: userData.value?.name,
      email: userData.value?.email,
      last_name: userData.value?.last_name,
      phone: userData.value?.phone,
      sex: genderCurrent,
      address: userData.value?.address,
      img: null,
      dni: userData.value?.dni,
      dni_text: userData.value?.dni_text || '',
      beneficiario_poliza_cedula: userData.value?.beneficiario_poliza_cedula,
      beneficiario_poliza_name: userData.value?.beneficiario_poliza_name || '',
      fecha_nacimiento: userData.value?.fecha_nacimiento || '',
      parentesco: userData.value?.parentesco || PARENTAGE[0],
    };
  }
});

const onPhotoDataSuccess = (imageData) => {
  const img = 'data:image/jpeg;base64,' + imageData;
  useForm.value.dni = convertToFile(img);
};

const onFail = (message) => {
  console.error('Failed because: ' + message);
};

const handledCamera = () => {
  openCamera(onPhotoDataSuccess, onFail);
};

const { isLoading, mutateAsync } = useUpdateUserMutation();

const uploadImage = (event) => {
  const selectedImage = event.target.files[0];
  useForm.value.img = selectedImage;
  fileInput.value = URL.createObjectURL(selectedImage);
};

const updateUser = async () => {
  validateForm();

  const updatedValues = {
    ...useForm.value,
    role_id: userData.value.role_id,
    active: userData.value.active,
    id: userData.value.id,
    sex: useForm.value.sex?.value,
    parentesco: useForm.value.parentesco.value,
  };
  await mutateAsync(updatedValues);

  updatedUser();
};
</script>

<template>
  <q-inner-loading :showing="isLoadingUser">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <div v-if="!isLoadingUser">
    <div class="full-width row justify-center">
      <div class="full-width title-large q-pt-lg q-pl-lg">
        <p>Perfil</p>
      </div>
      <div style="gap: 10px" class="q-pa-md full-width row wrap justify-center">
        <q-list bordered padding separator class="profile rounded-borders">
          <q-item>
            <q-item-section class="row justify-center full-width items-center">
              <q-avatar size="80px" class="q-mr-md">
                <q-img :src="userData?.img_url" spinner-color="dark" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Nombre</q-item-label>
              <q-item-label caption>{{ userData?.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Apellido</q-item-label>
              <q-item-label caption>{{ userData?.last_name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Email</q-item-label>
              <q-item-label caption>{{ userData?.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Telefono</q-item-label>
              <q-item-label caption>{{ userData?.phone }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Genero</q-item-label>
              <q-item-label caption>{{ useForm?.sex?.label }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Direccion</q-item-label>
              <q-item-label caption>{{ userData?.address }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isBusiness">
            <q-item-section>
              <q-item-label>Membresía</q-item-label>
              <q-item-label caption>{{
                userData?.membresia?.type
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isBusiness">
            <q-item-section>
              <q-item-label>Estado de Membresía</q-item-label>
              <q-item-label caption>{{
                userData?.membresia?.status
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isBusiness">
            <q-item-section>
              <q-item-label>Poliza</q-item-label>
              <q-item-label caption>{{
                userData?.seguro_active === '0' ? 'No activa' : 'Activa'
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isBusiness && userData?.dni">
            <q-item-section>
              <q-item-label>Documento de identidad</q-item-label>
              <q-item-label caption>
                <q-btn
                  label="Ver dni"
                  @click="showDni = true"
                  color="primary"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list
          bordered
          padding
          separator
          class="editContainer rounded-borders"
        >
          <form @submit.prevent="updateUser">
            <q-item>
              <q-item-section>
                <q-item-label class="title-medium">Editar</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="formContainer">
                <div class="column items-center">
                  <label class="cursor-pointer">
                    <q-avatar size="80px" class="q-mr-md">
                      <q-img
                        class="full-height"
                        :src="fileInput"
                        spinner-color="dark"
                      >
                        <div
                          style="font-size: 10px"
                          class="absolute-bottom absolute-top text-center"
                        >
                          Click para cambiar foto
                        </div>
                      </q-img>
                    </q-avatar>
                    <input
                      @change="uploadImage"
                      hidden
                      type="file"
                      accept="image/png, image/jpeg"
                      name="img"
                    />
                  </label>
                </div>
                <div class="full-width input">
                  <label class="label-large">
                    Name
                    <q-input
                      lazy-rules
                      type="text"
                      outlined
                      autocomplete="nope"
                      placeholder="Pepito"
                      v-model="useForm.name"
                      @blur="validatInput('name')"
                      @keypress="validatInput('name')"
                      name="name"
                    />
                  </label>
                  <p class="error" v-if="!!validateMessage.errors.name">
                    {{ validateMessage.errors.name }}
                  </p>
                </div>
                <div class="full-width input">
                  <label class="label-large">
                    Apellido
                    <q-input
                      lazy-rules
                      type="text"
                      v-model="useForm.last_name"
                      outlined
                      autocomplete="nope"
                      placeholder="Apellido"
                      @blur="validatInput('last_name')"
                      @keypress="validatInput('last_name')"
                      name="last_name"
                    />
                  </label>
                  <p class="error" v-if="!!validateMessage.errors.last_name">
                    {{ validateMessage.errors.last_name }}
                  </p>
                </div>
                <div class="full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Fecha de nacimiento
                    <q-input
                      lazy-rules
                      type="date"
                      v-model="useForm.fecha_nacimiento"
                      outlined
                      autocomplete="nope"
                      placeholder="Fecha de nacimiento"
                      name="fecha_nacimiento"
                    />
                  </label>
                  <p class="error" v-if="!!validateMessage.errors.last_name">
                    {{ validateMessage.errors.last_name }}
                  </p>
                </div>
                <div class="full-width input">
                  <label class="label-large">
                    Email
                    <q-input
                      lazy-rules
                      type="email"
                      v-model="useForm.email"
                      outlined
                      autocomplete="nope"
                      placeholder="example@gmail.com"
                      @blur="validatInput('email')"
                      @keypress="validatInput('email')"
                      name="email"
                    />
                  </label>
                  <p class="error" v-if="!!validateMessage.errors.email">
                    {{ validateMessage.errors.email }}
                  </p>
                </div>
                <div class="full-width input">
                  <label class="label-large">
                    Telefono
                    <q-input
                      lazy-rules
                      type="tel"
                      v-model="useForm.phone"
                      outlined
                      autocomplete="nope"
                      mask="#### - ####"
                      placeholder="6208-8987"
                      @blur="validatInput('phone')"
                      @keypress="validatInput('phone')"
                      name="phone"
                    />
                  </label>
                  <p class="error" v-if="!!validateMessage.errors.phone">
                    {{ validateMessage.errors.phone }}
                  </p>
                </div>
                <div class="full-width input">
                  <label class="label-large">
                    Direccion
                    <q-input
                      v-model="useForm.address"
                      lazy-rules
                      type="text"
                      autocomplete="nope"
                      outlined
                      placeholder=""
                      name="address"
                    />
                  </label>
                </div>
                <div class="q-ma-none full-width input">
                  <label class="label-large">
                    Genero
                    <q-select
                      outlined
                      lazy-rules
                      v-model="useForm.sex"
                      class="full-width q-ma-none"
                      :options="GENDER_OPTIONS"
                      name="sex"
                    />
                  </label>
                  <p class="error" v-if="!!validateMessage.errors.sex">
                    {{ validateMessage.errors.sex }}
                  </p>
                </div>

                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  Cédula / pasaporte de usuario
                  <div class="label-large full-width row no-wrap q-gutter-md">
                    <q-file
                      outlined
                      v-model="useForm.dni"
                      class="full-width"
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
                      @click="handledCamera"
                    />
                  </div>
                </div>

                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Introduce Cédula / pasaporte de usuario
                    <q-input
                      v-model="useForm.dni_text"
                      lazy-rules
                      type="text"
                      outlined
                      autocomplete="nope"
                      placeholder="23746766"
                      name="beneficiario_poliza_cedula"
                    />
                  </label>
                </div>

                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Poliza Beneficiario: Cédula / pasaporte
                    <q-input
                      v-model="useForm.beneficiario_poliza_cedula"
                      lazy-rules
                      type="text"
                      autocomplete="nope"
                      outlined
                      placeholder="23746766"
                      name="beneficiario_poliza_cedula"
                    />
                  </label>
                </div>
                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Poliza Beneficiario: Nombre
                    <q-input
                      v-model="useForm.beneficiario_poliza_name"
                      lazy-rules
                      type="text"
                      autocomplete="nope"
                      outlined
                      placeholder="Juan Perez"
                      name="beneficiario_poliza_name"
                    />
                  </label>
                </div>
                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Parentesco del beneficiario
                    <q-select
                      outlined
                      autocomplete="nope"
                      name="parentesco"
                      :options="PARENTAGE"
                      v-model="useForm.parentesco"
                      @blur="validatInput('parentesco')"
                      @keypress="validatInput('parentesco')"
                    />
                    <p
                      class="text-error"
                      v-if="!!validateMessage.errors.parentesco"
                    >
                      {{ validateMessage.errors.parentesco }}
                    </p>
                  </label>
                </div>
                <div class="q-ma-none full-width input">
                  <label class="label-large" v-if="!isBusiness">
                    Provincia que suele visitar
                    <q-select
                      outlined
                      v-model="useForm.provincia"
                      multiple
                      :options="provinceOptions"
                      use-chips
                      stack-label
                      label="Provincias"
                    />
                  </label>
                </div>
                <q-item-section class="button">
                  <q-btn
                    :loading="isLoading"
                    type="submit"
                    color="primary"
                    label="Guardar"
                  />
                </q-item-section>
              </q-item-section>
            </q-item>
          </form>
        </q-list>
      </div>
    </div>
  </div>

  <q-dialog v-model="showDni">
    <q-card style="min-width: 350px">
      <q-card-section>
        <p class="text-h6">Documento de identidad</p>
      </q-card-section>
      <q-card-section class="full-width row justify-center">
        <q-img
          :src="userData?.dni"
          spinner-color="primary"
          fit="contain"
          height="320px"
          width="320px"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cerrar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.editContainer {
  flex: 1;
  min-width: 300px;
  margin-right: 0;
  margin-left: 0;
}

.formContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.profile {
  width: 100%;
  margin: 0;
}

.dniText {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

@media (min-width: 700px) {
  .formContainer {
    grid-template-columns: 1fr 1fr;
  }

  .button {
    grid-column: 1 / 3;
  }

  .profile {
    width: 100%;
    max-width: 300px;
  }
}
</style>
