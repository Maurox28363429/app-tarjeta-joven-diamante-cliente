<template>
  <div class="full-width row justify-center">
    <div class="full-width title-large q-pt-lg q-pl-lg">
      <p>Perfil</p>
    </div>
    <div class="q-pa-md full-width row wrap justify-center container">
      <q-list bordered padding separator class="profile rounded-borders">
        <q-item>
          <q-item-section class="row justify-center full-width items-center">
            <q-avatar size="80px" class="q-mr-md">
              <img src="src/assets/profile.png" />
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
            <q-item-label caption>{{ genderCurrent.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Direccion</q-item-label>
            <q-item-label caption>{{ user.address }}</q-item-label>
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
                  />
                </label>
                <p class="error" v-if="!!validateMessage.errors.sex">
                  {{ validateMessage.errors.sex }}
                </p>
              </div>
              <q-item-section class="button">
                <q-btn
                  :loading="loading"
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
import { ref } from "vue";
import { useValidateForm } from "src/composables/useValidateForm";
import { updateProfileShema } from "src/schemas/updateProfileShema";
import updateUser from "src/api/updateUser";
import localStorageAuth from "src/utils/localStorageAuth";
import { useToast } from "src/composables/useToast";

const { triggerPositive, triggerWarning } = useToast();

const loading = ref(false);

const { user, updatedUser } = userAuth();

const GENDER_OPTIONS = [
  { label: "Mujer", value: 0 },
  { label: "Hombre", value: 1 },
];

const genderCurrent = GENDER_OPTIONS.find((item) => {
  return item.value === user.value.sex;
});

const INITIAL_VALUES = {
  name: user.value.name,
  email: user.value.email,
  last_name: user.value.last_name,
  phone: user.value.phone,
  sex: genderCurrent,
  address: user.value.address,
};

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: updateProfileShema });

const handledUpdateUser = async () => {
  validateForm();
  try {
    loading.value = true;
    const values = {
      ...useForm.value,
      role_id: user.value.role_id,
      active: user.value.active,
      id: user.value.id,
      sex: useForm.value.sex.value,
    };
    await updateUser(values);
    const userCurrent = localStorageAuth.getUser();
    localStorageAuth.setUser({
      user: { ...userCurrent.user, ...values },
      token: userCurrent.token,
    });
    updatedUser();
    triggerPositive("Usuario actualizado con éxito");
  } catch (err) {
    console.error(err);
    triggerWarning("Ah ocurrido un error, intente nuevamente");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.editContainer {
  flex: 1;
  min-width: 300px;
  margin-right: 0;
  margin-left: 0;
}

.container {
  gap: 16px;
}

.formContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.profile {
  width: 100%;
  margin: 0px;
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
