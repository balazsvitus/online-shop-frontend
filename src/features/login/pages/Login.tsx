import styles from '../styles/Login.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { passwordSchemaCheck, usernameSchemaCheck } from '../../../lib/schemas';
import { useLoginUserMutation } from '../api/loginApiSlice';
import useAuthContext from '../../../hooks/useAuthContext';
import { useEffect } from 'react';

const userSchema = z.object({
  username: usernameSchemaCheck,
  password: passwordSchemaCheck,
});

type UserFormValues = z.infer<typeof userSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });
  const { storeAuthData } = useAuthContext();

  const [login, { isLoading: loginLoading, data: loginData }] =
    useLoginUserMutation();

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    login({ username: data.username, password: data.password });
  };

  useEffect(() => {
    if (loginData) {
      storeAuthData(loginData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  return (
    <div className={styles.centerForm}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.loginTitle}>Sign in</h3>
        <div className="horizontal-divider" />
        <div className={styles.formItem}>
          <label htmlFor="username">Username</label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Username"
            id="username"
            {...register('username')}
          />
          {errors.username && (
            <p className={styles.errorMessage}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Password"
            id="password"
            {...register('password')}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <button
          className={styles.loginButton}
          type="submit"
          disabled={loginLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
}
