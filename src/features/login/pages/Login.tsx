import styles from '../styles/Login.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLogin from '../hooks/useLogin';

const passwordStrength = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength;
};

const userSchema = z.object({
  username: z.string().min(3, 'Username should have at least 3 characters'),
  password: z
    .string()
    .refine(
      passwordStrength,
      'Password must be at least 8 characters long and include uppercase, lowercase letters and numbers',
    ),
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
  const { login, loginLoading } = useLogin();

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    login(data.username, data.password);
  };

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
