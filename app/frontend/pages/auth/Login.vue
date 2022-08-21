<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
<!--    <div class="text-center mb-5">-->
<!--      <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>-->
<!--    </div>-->

<!--    <form ref="formRef" @submit.capture.prevent="handleSubmit" class="p-fluid">-->
<!--      <div>-->
<!--        <div class="field">-->
<!--          <label-->
<!--              for="email"-->
<!--              class="block text-900 font-medium mb-2">-->
<!--            Email-->
<!--          </label>-->
<!--          <InputText-->
<!--              id="email"-->
<!--              v-model="form.email"-->
<!--              type="text"-->
<!--              class="w-full mb-1"-->
<!--              data-celery-rule-required-->
<!--              data-celery-rule-email-->
<!--          />-->
<!--        </div>-->

<!--        <div class="field">-->
<!--          <label-->
<!--              for="password"-->
<!--              class="block text-900 font-medium mb-2">-->
<!--            Password-->
<!--          </label>-->
<!--          <InputText-->
<!--              v-model="form.password"-->
<!--              id="password"-->
<!--              type="password"-->
<!--              class="w-full mb-1"-->
<!--              data-celery-rule-required-->
<!--          />-->
<!--        </div>-->

<!--        <div class="flex align-items-center justify-content-between mb-6">-->
<!--          <div class="flex align-items-center">-->
<!--            <Checkbox id="rememberMe" :binary="true" v-model="checked" class="mr-2"></Checkbox>-->
<!--            <label for="rememberMe">Remember me</label>-->
<!--          </div>-->
<!--          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>-->
<!--        </div>-->

<!--        <Button type="submit" label="Sign In" icon="pi pi-user" class="w-full"></Button>-->
<!--      </div>-->
<!--      <div class="text-center mt-2">-->
<!--        <span class="text-600 font-medium line-height-3">Don't have an account?</span>-->
<!--        <Link-->
<!--            :href="$api.usersRegistrations.new.path()"-->
<!--            class="font-medium no-underline text-blue-500 cursor-pointer">-->
<!--          Create today!-->
<!--        </Link>-->
<!--      </div>-->
<!--    </form>-->
  </div>
</template>

<script setup>
/* Imports */
import { Link, useForm } from '@inertiajs/inertia-vue3'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'

/* Routes */
import { usersSessions } from '~/api/all'
import { dashboard } from '~/api/all'

/* Celery Validator */
import CeleryValidator from '~/helpers/celery-validator'

/* Logic */

const checked = ref(null)
const formRef = ref(null)
const form = useForm({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  if (formRef.value.validateForm()) {
    form.transform((data) => ({ user: data }))
        .post(usersSessions.new.path(), {
          onSuccess: () => Inertia.visit(dashboard.list.path())
        })
  }
}

onMounted(() => {
  new CeleryValidator({ form: formRef.value, options: { validateOnSubmit: false } })
})

</script>