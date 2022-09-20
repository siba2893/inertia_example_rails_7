import { Alert, Container } from '@mantine/core'
import IconMdiAlertCircleOutline from '~icons/mdi/alert-circle-outline'
import IconMdiCheckboxMarkedCircleOutline from '~icons/mdi/checkbox-marked-circle-outline'
import IconMdiInformationOutline from '~icons/mdi/information-outline'

const FlashMessages = ({ flash }) => {
  if (Object.values(flash).filter(Boolean).length === 0) return

  const flashMessage = flash['alert'] ?
    <Alert icon={ <IconMdiAlertCircleOutline size={ 16 }/> }
           title="Bummer!"
           color="red"
           radius="md"
           variant="outline">
      { flash['alert'] }
    </Alert> :
    null

  const noticeMessage = flash['notice'] ?
    <Alert icon={ <IconMdiInformationOutline size={ 16 }/> }
           title="Look Here!"
           radius="md"
           variant="outline">
      { flash['notice'] }
    </Alert> :
    null

  const successMessage = flash['success'] ?
    <Alert icon={ <IconMdiCheckboxMarkedCircleOutline size={ 16 }/> }
           title="Awesome!"
           color="green"
           radius="md"
           variant="outline">
      { flash['success'] }
    </Alert> :
    null

  return (
    <Container size={960} style={ { width: '100%' } }>
      { flashMessage }
      { noticeMessage }
      { successMessage }
    </Container>
  );
};

export default FlashMessages;
