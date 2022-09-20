import React, { useEffect, useState } from 'react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'

const MainLink = ({ icon, color, label, active, url }) => {
  return (
    <UnstyledButton
      to={ url }
      component={ InertiaLink }
      sx={ (theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        backgroundColor: active ? theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1] : 'none',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      }) }
    >
      <Group>
        <ThemeIcon color={ color } variant="light">
          { icon }
        </ThemeIcon>

        <Text size="sm">{ label }</Text>
      </Group>
    </UnstyledButton>
  )
}

const MainLinks = ({ data }) => {
  const { url } = usePage()
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currPath = window.location.pathname.split('/')[1];
    const activeItem = data.findIndex(item => item.section === currPath)

    setActiveIndex(currPath.length === 0 ? 0 : activeItem)
  }, [url])

  const links = data.map((link, i) =>
    <MainLink { ...link } active={ activeIndex === i } key={ link.label }/>
  );

  return <div>{ links }</div>;
};

export default MainLinks;
