<template>
  <div class="min-w-[320px] md:min-w-[450px] max-w-[450px]">
    Signup
  </div>
</template>

<script setup>
/* Imports */
import { Link, useForm } from '@inertiajs/inertia-vue3'
import { usersRegistrations, dashboard } from '~/api/all'

/* Variables */
const form = useForm({
  email: '',
  password: '',
  passwordConfirmation: ''
})

/* Computed Properties */

/* Methods */
const handleSubmit = (e) => {
  // formRef.value.validate((errors) => {
  //   if (!errors) {
  //     form.transform((data) => ({ user: data }))
  //         .post(usersRegistrations.create.path(), {
  //           onSuccess: () => Inertia.visit(dashboard.list.path())
  //         })
  //   }
  // })
}
</script>