<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import getUserMembresiaComprada from 'src/api/getUserMembresiaComprada.js';
import { useValidateForm } from 'src/composables/useValidateForm';
import { useGetUsersQuery } from 'src/querys/userQuerys';
import { paymentShemaUpdate } from 'src/schemas/paymentShema';
import {
  useGetMembershipsQuery,
  usePaymentMembershipMutation,
} from 'src/querys/membership';
const current = ref(1);
const maxpage = ref(1);
const datos = ref([]);
const search = ref('');

const showAssignMembershipModal = ref(false);

const { data: users, isLoading } = useGetUsersQuery();
const { data: membershipsData, isLoading: membershipLoading } =
  useGetMembershipsQuery();
const { mutate: paymentMembership, isLoading: paymentMembershipLoading } =
  usePaymentMembershipMutation();

const userOptions = ref([]);
const memberships = ref([]);

watchEffect(() => {
  if (users.value && !isLoading.value) {
    userOptions.value = users.value?.data?.map(({ name, id, last_name }) => {
      return {
        label: `${name} ${last_name}`,
        value: id,
      };
    });
  }

  if (membershipsData.value && !membershipLoading.value) {
    memberships.value = membershipsData.value?.data?.map(({ name, id }) => {
      return {
        label: name,
        value: id,
      };
    });
  }
});

const options = ref(userOptions.value);
const membershipOptions = ref(memberships.value);

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = userOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = userOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterFn2 = (val, update) => {
  if (val === '') {
    update(() => {
      membershipOptions.value = memberships.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    membershipOptions.value = memberships.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({
    initialValue: {
      user_id: null,
      membresia_id: null,
    },
    schema: paymentShemaUpdate,
  });

watchEffect(() => {
  if (userOptions.value.length > 0 && memberships.value.length > 0) {
    useForm.value = {
      membresia_id: memberships.value[0],
      user_id: userOptions.value[0],
    };
  }
});

const price = ref(0);

watchEffect(() => {
  if (
    membershipsData.value?.data &&
    !membershipLoading.value &&
    useForm.value?.membresia_id?.value
  ) {
    price.value = membershipsData.value?.data?.find(
      (membership) => membership.id === useForm.value.membresia_id.value
    ).price;
  }
});

watch(current, async (val) => {
  await cargar();
});
const cargar = async () => {
  const { data, pagination } = await getUserMembresiaComprada(
    current.value,
    search.value
  );
  datos.value = data;
  current.value = pagination.currentPage;
  maxpage.value = pagination.lastPage;
};
/* const cambiar=async(id,status)=>{
  console.log(id,status)
}
 */
onMounted(async () => {
  await cargar();
});

const excelDonwload = async () => {
  window.open(
    process.env.VUE_APP_API_URL + 'export_membresia?membresia=1',
    '_blank'
  );
};
const pdfDonwload = async () => {
  window.open(process.env.VUE_APP_API_URL + 'export_pdf_membresia', '_blank');
};

const addMembership = async () => {
  validateForm();
  paymentMembership({
    membresia_id: useForm.value.membresia_id.value,
    user_id: useForm.value.user_id.value,
    referencia: 'Efectivo',
    price: price.value,
    yappy: 1,
  });
};
</script>

<template>
  <div class="text-center q-pa-md flex">
    <section style="width: 100%">
      <q-card>
        <h5 style="margin-left: 1em; text-align: left; padding: 1em">
          Membresias compradas
          <div style="float: right; margin-top: 1em" class="q-gutter-x-md">
            <q-btn
              label="Asignar membresia"
              color="primary"
              @click="showAssignMembershipModal = true"
            />
            <q-btn
              style="background: #0c844f; color: white"
              round
              icon="file_download"
              @click="excelDonwload()"
            />
            <q-btn
              style="background: #840c0c; color: white"
              round
              icon="picture_as_pdf"
              @click="pdfDonwload()"
            />
          </div>
        </h5>

        <div class="full-width row justify-center" style="padding: 1em">
          <q-input
            class="full-width"
            rounded
            dense
            v-model="search"
            style="max-width: 400px"
            outlined
            type="search"
            label="Buscar ofertas"
            color="primary"
          >
            <q-btn
              @click="cargar()"
              size="md"
              style="
                right: -12px;
                bottom: 0;
                top: 0;
                border-radius: 0 26px 26px 0;
              "
              color="primary"
              label="Buscar"
              icon="search"
              class="absolute"
            />
          </q-input>
        </div>
        <table>
          <thead>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Membresia</th>
            <th>Dias restantes</th>
            <th>Fecha de expiracion</th>
          </thead>
          <tbody>
            <tr v-for="(d, index) in datos" :key="index">
              <td>{{ d.id }}</td>
              <td>{{ d.name }} {{ d.last_name }}</td>
              <td>
                <!-- <q-toggle
                  disabled="true"
                  v-model="d.membresia.status_num"
                  @change="
                    cambiar(
                      d.membresia.id,
                      (d.membresia.status_num = !d.membresia.status_num)
                    )
                  "
                  :true-value="1"
                  :false-value="0"
                /> -->
                <q-icon
                  v-if="d.membresia.status_num == 1"
                  name="check_circle"
                  color="primary"
                  size="2rem"
                />
                <q-icon v-else name="cancel" color="red" size="2rem" />
              </td>
              <td>
                {{ d.membresia.days }}
              </td>
              <td>
                {{ d.membresia.fecha_cobro }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-center" style="padding: 1em">
          <q-pagination
            v-model="current"
            :max="maxpage"
            direction-links
            outline
            color="blue"
            active-design="unelevated"
            active-color="white"
            active-text-color="blue"
          />
        </div>
      </q-card>
    </section>
  </div>

  <q-dialog v-model="showAssignMembershipModal">
    <q-card>
      <q-card-section class="text-h6 text-weight-bold">
        Asignar membresia en efectivo
      </q-card-section>
      <q-card-section>
        <form @submit.prevent="addMembership">
          <div class="q-ma-none full-width input">
            <label class="label-large">
              Usuario
              <q-select
                outlined
                use-input
                input-debounce="0"
                label="Usuario"
                v-model="useForm.user_id"
                autocomplete="nope"
                :options="options"
                @blur="validatInput('user_id')"
                @keypress="validatInput('user_id')"
                name="user_id"
                @filter="filterFn"
                behavior="menu"
              />
              <p class="error" v-if="!!validateMessage.errors.user_id">
                {{ validateMessage.errors.user_id }}
              </p>
            </label>
          </div>
          <div class="q-ma-none full-width input">
            <label class="label-large">
              Membresia
              <q-select
                outlined
                use-input
                input-debounce="0"
                label="Planes"
                v-model="useForm.membresia_id"
                autocomplete="nope"
                :options="membershipOptions"
                @blur="validatInput('membresia_id')"
                @keypress="validatInput('membresia_id')"
                name="membresia_id"
                @filter="filterFn2"
                behavior="menu"
              />
              <p class="error" v-if="!!validateMessage.errors.membresia_id">
                {{ validateMessage.errors.membresia_id }}
              </p>
            </label>
          </div>
          <div>
            <p class="q-mt-none text-weight-bold text-body1">
              <span class="text-grey">Precio: </span>${{ price }}
            </p>
          </div>
          <div class="row full-width justify-center" style="gap: 6px">
            <q-btn label="Cerrar" color="secondary" v-close-popup />
            <q-btn
              :loading="paymentMembershipLoading"
              type="submit"
              label="Asignar membresia"
              color="primary"
            />
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped>
table {
  width: 100%;
}
td,
th {
  padding: 1em;
}
</style>
