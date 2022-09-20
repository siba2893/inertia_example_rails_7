import FlashMessages from '@components/shared/FlashMessages'

const AuthLayout = ({ children, flash }) => {
  return (
    <div>
      <FlashMessages flash={ flash }/>
      { children }
    </div>
  );
};

export default AuthLayout;
