<template>
  <div class="full-width row justify-center">
    <div class="full-width title-large q-pt-lg q-pl-lg">
      <p>Perfil</p>
    </div>
    <div style="gap: 10px" class="q-pa-md full-width row wrap justify-center">
      <q-list bordered padding separator class="profile rounded-borders">
        <q-item>
          <q-item-section class="row justify-center full-width items-center">
            <q-avatar size="80px" class="q-mr-md">
              <q-img src="./../../assets/profile.png" spinner-color="dark" />
            </q-avatar>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Nombre</q-item-label>
            <q-item-label caption>{{ user.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Apellido</q-item-label>
            <q-item-label caption>{{ user.last_name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Email</q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Telefono</q-item-label>
            <q-item-label caption>{{ user.phone }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Genero</q-item-label>
            <q-item-label caption>{{ genderCurrent?.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Direccion</q-item-label>
            <q-item-label caption>{{ user?.address }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Membresía</q-item-label>
            <q-item-label caption>{{ user.membresia?.type }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Estado de Membresía</q-item-label>
            <q-item-label caption>{{ user.membresia?.status }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list bordered padding separator class="editContainer rounded-borders">
        <form @submit.prevent="handledUpdateUser">
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
                    <q-img :src="file" spinner-color="dark">
                      <div
                        style="font-size: 10px"
                        class="absolute-bottom absolute-top text-center"
                      >
                        Click para cambiar foto
                      </div>
                    </q-img>
                  </q-avatar>
                  <input
                    @change="uploadImg"
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
              <div class="full-width input">
                <label class="label-large">
                  Fecha de nacimiento
                  <q-input
                    lazy-rules
                    type="date"
                    v-model="useForm.fecha_nacimiento"
                    outlined
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
                    placeholder="0414767997"
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

              <div class="q-ma-none full-width input">
                <label class="label-large">
                  DNI
                  <q-input
                    v-model="useForm.dni"
                    lazy-rules
                    type="text"
                    outlined
                    placeholder=""
                    name="dni"
                  />
                </label>
              </div>

              <div class="q-ma-none full-width input">
                <label class="label-large">
                  Poliza Beneficiario: DNI
                  <q-input
                    v-model="useForm.beneficiario_poliza_cedula"
                    lazy-rules
                    type="text"
                    outlined
                    placeholder=""
                    name="beneficiario_poliza_cedula"
                  />
                </label>
              </div>
              <div class="q-ma-none full-width input">
                <label class="label-large">
                  Poliza Beneficiario: Nombre
                  <q-input
                    v-model="useForm.beneficiario_poliza_name"
                    lazy-rules
                    type="text"
                    outlined
                    placeholder=""
                    name="beneficiario_poliza_name"
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
</template>
<script setup>
import { userAuth } from "src/composables/userAuth";
import { ref, watch, watchEffect } from "vue";
import { useValidateForm } from "src/composables/useValidateForm";
import { updateProfileShema } from "src/schemas/updateProfileShema";
import localStorageAuth from "src/utils/localStorageAuth";
import profile from "../../assets/profile.png";
import { useUpdateUserMutation } from "src/querys/userQuerys";

const { user: userStore, updatedUser } = userAuth();
const user = ref(localStorageAuth.getUser().user);

watch(
  userStore,
  () => {
    user.value = userStore.value;
  },
  { immediate: true }
);

const GENDER_OPTIONS = [
  { label: "Mujer", value: 0 },
  { label: "Hombre", value: 1 },
];

const genderCurrent = GENDER_OPTIONS.find((item) => {
  return item.value === user.value.sex;
});

const file = ref(profile);

const INITIAL_VALUES = {
  name: user.value.name,
  email: user.value.email,
  last_name: user.value.last_name,
  phone: user.value.phone,
  sex: genderCurrent,
  address: user.value.address,
  img: file.value,
  dni: user.value.dni || "",
  beneficiario_poliza_cedula: user.value.beneficiario_poliza_cedula || "",
  beneficiario_poliza_name: user.value.beneficiario_poliza_name || "",
  fecha_nacimiento: user.value.fecha_nacimiento || "",
};

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: updateProfileShema });

const { isLoading, mutate, data } = useUpdateUserMutation();

const uploadImg = (event) => {
  const image = event.target.files[0];
  useForm.value.img = image;
  file.value = URL.createObjectURL(image);
};

watchEffect(() => {
  if (data.value) {
    updatedUser();
  }
});

const handledUpdateUser = () => {
  validateForm();
  const values = {
    ...useForm.value,
    role_id: user.value.role_id,
    active: user.value.active,
    id: user.value.id,
    sex: useForm.value.sex.value,
  };

  mutate({ data: values, id: user.value.id });
  const userCurrent = localStorageAuth.getUser();
  localStorageAuth.setUser({
    user: { ...userCurrent.user, ...values },
    token: userCurrent.token,
  });
};
</script>

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
