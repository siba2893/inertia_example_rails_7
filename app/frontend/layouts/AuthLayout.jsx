import { Stack } from '@mantine/core'

const AuthLayout = ({ children }) => {
  return (
    <Stack className={'h-full'} align={'center'} justify={'center'}>
      { children }
    </Stack>
  );
};

export default AuthLayout;
