import { IconHome } from '@tabler/icons'
import {
  AppShell,
  Burger,
  MediaQuery,
  Header,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core'

import { useState } from 'react'
import UserInfo from '@components/UserInfo'
import MainLinks from '@components/MainLinks'

const MainLayout = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const navLinks = [
    { icon: <IconHome size={ 16 }/>, color: 'blue', label: 'Dashboard', url: '/', section: 'dashboard' },
  ];

  return (
    <AppShell
      styles={ {
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      } }
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={ !opened } width={ { sm: 200, lg: 300 } }>
          <Navbar.Section grow mt="xs">
            <MainLinks data={ navLinks }/>
          </Navbar.Section>
          <Navbar.Section>
            <UserInfo/>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={ 70 } p="md">
          <div style={ { display: 'flex', alignItems: 'center', height: '100%' } }>
            <MediaQuery largerThan="sm" styles={ { display: 'none' } }>
              <Burger
                opened={ opened }
                onClick={ () => setOpened((o) => !o) }
                size="sm"
                color={ theme.colors.gray[6] }
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      { children }
    </AppShell>
  );
};

export default MainLayout;
