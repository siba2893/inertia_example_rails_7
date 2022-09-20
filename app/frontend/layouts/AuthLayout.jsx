import { Stack } from '@mantine/core'
import FlashMessages from '@components/shared/FlashMessages'

const AuthLayout = ({ children, flash }) => {
  return (
    <Stack className={ 'h-full' } align={ 'center' } justify={ 'center' }>
      <FlashMessages flash={ flash }/>
      { children }
    </Stack>
  );
};

export default AuthLayout;
