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
  Link,
  useColorModeValue
} from '@chakra-ui/react'

import AuthLayout from '@/layouts/AuthLayout'
import { PasswordField } from '@/components/inputs/PasswordField'

const Login = () => {
  return (
    <AuthLayout>
      <Stack spacing={ 8 } mx={ 'auto' } maxW={ 'lg' } py={ 12 } px={ 6 }>
        <Stack align={ 'center' }>
          <Heading fontSize={ '4xl' }>Sign in to your account</Heading>
          <Text fontSize={ 'lg' } color={ 'gray.600' }>
            to enjoy all of our cool <Link color={ 'blue.400' }>features</Link> ✌️
          </Text>
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
            <Stack spacing={ 10 }>
              <Stack
                direction={ { base: 'column', sm: 'row' } }
                align={ 'start' }
                justify={ 'space-between' }>
                <Checkbox>Remember me</Checkbox>
                <Link color={ 'blue.400' }>Forgot password?</Link>
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

export default Login;
