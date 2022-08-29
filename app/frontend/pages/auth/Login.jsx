import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core'

import AuthLayout from '@layouts/AuthLayout'
import { Inertia } from '@inertiajs/inertia'
import SessionsApi from '@api/Users/SessionsApi'
import { iVisitPrevent } from '@helpers/utils'

const Login = () => {
  return (
    <AuthLayout>
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
          <TextInput label="Email" placeholder="you@mantine.dev" required/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
          <PasswordInput label="Password Confirmation" placeholder="Confirm your password" required mt="md"/>
          <Button fullWidth mt="xl">
            Sign Up
          </Button>
        </Paper>
      </Container>
    </AuthLayout>
  )
}

export default Login;
