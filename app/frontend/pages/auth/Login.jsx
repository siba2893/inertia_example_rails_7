/* Mantine Imports */
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core'

/* Component Imports */
import AuthLayout from '@layouts/AuthLayout'

/* Helper Imports */
import SessionsApi from '@api/Users/SessionsApi'
import { iVisitPrevent } from '@helpers/utils'
import { validate, required, email } from '@helpers/input-validators'
import { usersSessions } from '@api/all'
import { Inertia } from '@inertiajs/inertia'


const Login = ({ flash }) => {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => validate([required, email], { value }),
      password: (value) => validate([required], { value })
    }
  })


  const onLogIn = (values) => {
    Inertia.post(usersSessions.create.path(), { user: values })
  }

  return (
    <AuthLayout flash={ flash }>
      <Container size={ 420 } className={ 'w-full' }>
        <Title
          align="center"
          sx={ (theme) => ({ fontFamily: theme.fontFamily, fontWeight: 900 }) }
        >
          Let's create an account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={ 5 }>
          Already have one?{ ' ' }
          <Anchor size="sm" onClick={ (event) => iVisitPrevent(SessionsApi.new.path(), event) }>
            Log In
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={ 30 } mt={ 30 } radius="md">
          <form onSubmit={ form.onSubmit(onLogIn) }>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              { ...form.getInputProps('email') }
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              { ...form.getInputProps('password') }
            />
            <Button type="submit" fullWidth mt="xl">
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </AuthLayout>
  )
}

export default Login;
