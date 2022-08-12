<template>
  <div class="min-w-[320px] md:min-w-[450px] max-w-[450px]">
    <n-card title="Ingresar a tu cuenta">
      <template #header-extra>
        <Link :href="routes.getSignUp"
              aria-label="Sign Up"
              role="navigation">
          <n-button type="info" quaternary>
            Crear Cuenta
          </n-button>
        </Link>
      </template>
      <n-form
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          size="medium"
          label-placement="top"
      >
        <n-grid cols="1">
          <n-form-item-gi label="Correo" path="email">
            <n-input v-model:value="formModel.email" placeholder="micorreo@ejemplo.com"/>
          </n-form-item-gi>
          <n-form-item-gi label="Contraseña" path="email">
            <n-input v-model:value="formModel.password"
                     placeholder="********"
                     type="email"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>

      <template #action>
        <n-space justify="space-between">
          <n-button type="info">
            Login
          </n-button>
          <n-button type="info" quaternary>
            Olvide mi contraseña
          </n-button>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup>
/* Imports */
import { Link } from '@inertiajs/inertia-vue3'

import { ref, computed } from 'vue'
import api from '~/api'

/* Variables */
const formRef = ref(null)
const formModel = ref({
  email: '',
  password: ''
})
const formRules = ref({
  email: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: "Este campo es requerido"
    },
    {
      type: 'email',
      trigger: ["blur", "input"],
      message: "El correo no tiene un formato válido."
    }
  ],
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "Este campo es requerido"
  },
})

/* Computed Properties */
const routes = computed(() => {
  return {
    getSignUp: api.usersRegistrations.new.path(),
  }
})
</script>