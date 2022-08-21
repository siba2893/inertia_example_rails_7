<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
    <div class="text-center mb-5">
      <div class="text-900 text-3xl font-medium mb-3">Want to join?</div>
    </div>

    <form ref="formRef" @submit.capture.prevent="handleSubmit" class="p-fluid">
      <div>
        <div class="field">
          <label
              for="email"
              class="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
              id="email"
              v-model="form.email"
              type="text"
              class="w-full mb-1"
              data-celery-rule-required
              data-celery-rule-email
          />
        </div>

        <div class="field">
          <label
              for="password"
              class="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
              v-model="form.password"
              id="password"
              type="password"
              class="w-full mb-1"
              data-celery-rule-required
          />
        </div>

        <div class="field">
          <label
              for="passwordConfirmation"
              class="block text-900 font-medium mb-2">
            Password Confirmation
          </label>
          <InputText
              v-model="form.passwordConfirmation"
              id="passwordConfirmation"
              type="password"
              class="w-full mb-1"
              data-celery-rule-required
          />
        </div>

        <Button type="submit" label="Sign Up" icon="pi pi-user" class="w-full"></Button>
      </div>
      <div class="text-center mt-2">
        <span class="text-600 font-medium line-height-3">Already have an account let's</span>
        <Link
            :href="$api.usersSessions.new.path()"
            class="font-medium no-underline ml-1 text-blue-500 cursor-pointer">
          Sign in
        </Link>
      </div>
    </form>
  </div>
</template>

<script setup>
/* Imports */
import { Link, useForm } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'

/* Routes */
import { usersRegistrations } from '~/api/all'
import { dashboard } from '~/api/all'

/* PrimeVue */
import Button from 'primevue/button/sfc'
import InputText from 'primevue/inputtext/sfc'

/* Celery Validator */
import CeleryValidator from '~/helpers/celery-validator'

/* Logic */

const formRef = ref(null)
const form = useForm({
  email: '',
  password: '',
  passwordConfirmation: ''
})

const handleSubmit = async () => {
  if (formRef.value.validateForm()) {
    form.transform((data) => ({ user: data }))
        .post(usersRegistrations.create.path(), {
          onSuccess: () => Inertia.visit(dashboard.list.path())
        })
  }
}

onMounted(() => {
  new CeleryValidator({ form: formRef.value, options: { validateOnSubmit: false } })
})

</script>