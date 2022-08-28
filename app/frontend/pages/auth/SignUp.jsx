import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import { Link } from '@inertiajs/inertia-react'

import AuthLayout from '@/layouts/AuthLayout'
import { PasswordField } from '@/components/inputs/PasswordField'
import SessionsApi from '@/api/Users/SessionsApi'

const SignUp = () => {
  return (
    <AuthLayout>
      <Stack spacing={ 8 } mx={ 'auto' } maxW={ 'lg' } py={ 12 } px={ 6 }>
        <Stack align={ 'center' }>
          <Heading fontSize={ '4xl' }>Let's create an account</Heading>
        </Stack>
        <Box
          rounded={ 'lg' }
          bg={ useColorModeValue('white', 'gray.700') }
          boxShadow={ 'lg' }
          p={ 8 }>
          <Stack spacing={ 4 }>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"/>
            </FormControl>
            <PasswordField/>
            <PasswordField label={'Password Confirmation'}/>
            <Stack spacing={ 10 }>
              <Stack
                direction={ { base: 'column', sm: 'row' } }
                align={ 'start' }
                justify={ 'space-between' }>
                <Checkbox>Remember me</Checkbox>
                <Link href={ SessionsApi.new.path() } color={ 'blue.400' }>Already have an account</Link>
              </Stack>
              <Button colorScheme='blue'>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </AuthLayout>
  );
};

export default SignUp;
