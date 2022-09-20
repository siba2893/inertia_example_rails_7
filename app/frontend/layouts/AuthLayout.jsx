import { Container, Flex, useColorModeValue } from '@chakra-ui/react'
import FlashMessages from '@components/shared/FlashMessages'

const AuthLayout = ({ children, flash }) => {
  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.100', 'gray.800')}>
        <Container
          maxW="lg" py={ { base: '12', md: '24' } }
          px={ { base: '0', sm: '8' } }>
          <FlashMessages flash={ flash }/>
          { children }
        </Container>
      </Flex>
    </>
  );
};

export default AuthLayout;
