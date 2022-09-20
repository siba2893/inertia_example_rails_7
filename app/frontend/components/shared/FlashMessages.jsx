const FlashMessages = ({ flash }) => {
  if (Object.values(flash).filter(Boolean).length === 0) return

  const flashMessage = flash['alert'] ?
    /* Alert */ null :
    null

  const noticeMessage = flash['notice'] ?
    /* Notice */ null :
    null

  const successMessage = flash['success'] ?
    /* Success */ null :
    null

  return (
    <div style={ { width: '100%', maxWidth: '960px' } }>
      { flashMessage }
      { noticeMessage }
      { successMessage }
    </div>
  );
};

export default FlashMessages;
