<template>
  <div class="min-w-[320px] md:min-w-[450px] max-w-[450px]">
    <n-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        size="medium"
        label-placement="top"
        @submit.prevent="handleSubmit"
    >
      <n-card title="Crear una cuenta">
        <n-grid cols="1">
          <n-form-item-gi label="Correo" path="email">
            <n-input v-model:value="form.email" placeholder="micorreo@ejemplo.com"/>
          </n-form-item-gi>
          <n-form-item-gi label="Contraseña" path="password">
            <n-input v-model:value="form.password"
                     placeholder="********"
                     type="password"
            />
          </n-form-item-gi>
          <n-form-item-gi label="Repetir Contraseña" path="passwordConfirmation">
            <n-input v-model:value="form.passwordConfirmation"
                     placeholder="********"
                     type="password"
            />
          </n-form-item-gi>
        </n-grid>


        <template #action>
          <n-space justify="space-between">
            <n-button attr-type="submit"
                      type="info"
                      :disabled="form.processing"
                      :loading="form.processing">
              Crear
            </n-button>
            <Link
                :href="$route.usersSessions.new.path()"
                aria-label="Login"
                role="navigation">
              <n-button type="info" quaternary>
                Ya tengo cuenta!
              </n-button>
            </Link>
          </n-space>
        </template>
      </n-card>
    </n-form>
  </div>
</template>

<script setup>
/* Imports */
import { Link, useForm } from '@inertiajs/inertia-vue3'

import { ref, computed } from 'vue'
import { required, sameAs, type } from '~/utils/validations'
import { usersRegistrations, dashboard } from '~/api/all'
import { Inertia } from '@inertiajs/inertia'

/* Variables */
const formRef = ref(null)
const form = useForm({
  email: '',
  password: '',
  passwordConfirmation: ''
})

/* Computed Properties */
const formRules = computed(() => ({
  email: [required(), type({ type: 'email' })],
  password: required(),
  passwordConfirmation: [
    required(),
    sameAs({ valueToCompare: form.password, fieldName: 'Contraseña' }),
  ],
}))

/* Methods */
const handleSubmit = (e) => {
  formRef.value.validate((errors) => {
    if (!errors) {
      form.transform((data) => ({ user: data }))
          .post(usersRegistrations.create.path(), {
            onSuccess: () => Inertia.visit(dashboard.list.path())
          })
    }
  })
}
</script>