import classes from "./Login.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/redux/login/login-slice";

const Login = (props) => {
  const dispatchFn = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginHandler = (e) => {
    e.preventDefault();
    //Tổng hợp data submit
    const dataSubmit = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      token: true,
    };
    //Chạy submit lên api custom login
    dispatchFn(fetchLogin(dataSubmit));
  };
  return (
    <form onSubmit={loginHandler} className={classes.container}>
      <label htmlFor="email">Email</label>
      <input ref={emailRef} id="email" type="email" required />
      <label htmlFor="password">Mật khẩu :</label>
      <input ref={passwordRef} id="password" type="password" required />
      <button
        style={{ margin: ".5rem" }}
        type="submit"
        className="btn btn-submit"
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default Login;
