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
        </q-list>
        <q-list
          bordered
          padding
          separator
          class="editContainer rounded-borders"
        >
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
                      <q-img
                        class="full-height"
                        :src="file"
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
                <div class="full-width input" v-if="!isBusiness">
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

                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Cédula / pasaporte
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

                <div class="q-ma-none full-width input" v-if="!isBusiness">
                  <label class="label-large">
                    Poliza Beneficiario: Cédula / pasaporte
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
                <div class="q-ma-none full-width input" v-if="!isBusiness">
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
</template>

<script setup>
import { userAuth } from "src/composables/userAuth";
import { ref, watch, defineProps, computed, watchEffect } from "vue";
import { useValidateForm } from "src/composables/useValidateForm";
import { updateProfileShema } from "src/schemas/updateProfileShema";
import { useUpdateUserMutation } from "src/querys/userQuerys";
import { useGetStates } from "src/querys/offersQuerys";

const {
  updatedUser,
  userData,
  isLoadingUser,
  isFetchingUser,
  isFetchedAfterMountUser,
  isFetchedUser,
} = userAuth();

const props = defineProps({
  user: {
    type: String,
    required: true,
  },
});

const { data } = useGetStates();

const provinceOptions = computed(() =>
  data.value?.data.map((element) => {
    return element.name;
  })
);

const isBusiness = props.user === "business";

let genderCurrent = { label: "", value: "" };

const GENDER_OPTIONS = [
  { label: "Mujer", value: 0 },
  { label: "Hombre", value: 1 },
];

const file = ref(userData.value?.img_url ?? "");

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: {}, schema: updateProfileShema });

console.log(useForm.value, "value");

watchEffect(() => {
  if (useForm.value?.provincia?.length > 2 && userData.value) {
    useForm.value?.provincia.pop();
  }
});

watch([userData, isFetchedAfterMountUser, isFetchedUser], () => {
  console.log(useForm.value, "value");
  if (userData.value && !isFetchingUser.value) {
    genderCurrent = GENDER_OPTIONS.find((item) => {
      return item.value === userData.value?.sex;
    });
    file.value = userData.value?.img_url;
    console.log(useForm.value, "value");
    useForm.value = {
      provincia: Array.isArray(userData.value.provincia)
        ? userData.value.provincia
        : JSON.parse(userData.value.provincia),
      name: userData.value?.name,
      email: userData.value?.email,
      last_name: userData.value?.last_name,
      phone: userData.value?.phone,
      sex: genderCurrent,
      address: userData.value?.address,
      img: null,
      dni: userData.value?.dni || "",
      beneficiario_poliza_cedula:
        userData.value?.beneficiario_poliza_cedula || "",
      beneficiario_poliza_name: userData.value?.beneficiario_poliza_name || "",
      fecha_nacimiento: userData.value?.fecha_nacimiento || "",
    };
  }
});

const { isLoading, mutateAsync } = useUpdateUserMutation();

const uploadImg = (event) => {
  const image = event.target.files[0];
  useForm.value.img = image;
  file.value = URL.createObjectURL(image);
};

const handledUpdateUser = async () => {
  validateForm();

  const values = {
    ...useForm.value,
    role_id: userData.value.role_id,
    active: userData.value.active,
    id: userData.value.id,
    sex: useForm.value.sex?.value,
  };
  await mutateAsync({ data: values, id: userData.value.id });

  updatedUser();
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
