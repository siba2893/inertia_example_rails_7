import AuthLayout from '@layouts/AuthLayout'
import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { iVisitPrevent } from '@helpers/utils'
import RegistrationsApi from '@api/Users/RegistrationsApi'
import PasswordsApi from '@api/Users/PasswordsApi'

const SignUp = () => {
  return (
    <AuthLayout>
      <Container size={ 420 } className={ 'w-full' }>
        <Title
          align="center"
          sx={ (theme) => ({ fontFamily: theme.fontFamily, fontWeight: 900 }) }
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={ 5 }>
          Do not have an account yet?{ ' ' }
          <Anchor size="sm" onClick={ (event) => iVisitPrevent(RegistrationsApi.new.path(), event) }>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={ 30 } mt={ 30 } radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
          <Group position="apart" mt="md">
            <Checkbox label="Remember me"/>
            <Anchor onClick={ (event) => iVisitPrevent(PasswordsApi.new.path(), event) } href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </AuthLayout>
  )
}

export default SignUp;
