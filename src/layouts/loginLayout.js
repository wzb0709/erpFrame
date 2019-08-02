import styles from './index.css';

function LoginLayout(props) {
  return (
    <div className={styles.background} >
      {props.children}
    </div>
  );
}

export default LoginLayout;
