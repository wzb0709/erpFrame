import LoginLayout from '@/layouts/loginLayout';
import MenuLayout from '@/layouts/basicLayout'

function BasicLayout(props) {
  if (props.location.pathname === '/login') {
    return(
      <LoginLayout>
        { props.children }
      </LoginLayout>
    )
  }

  return (
    <MenuLayout>
      {props.children}
    </MenuLayout>
  );
}

export default BasicLayout;
