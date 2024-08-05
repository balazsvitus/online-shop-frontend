import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { passwordSchemaCheck, usernameSchemaCheck } from '../../../lib/schemas';
import { useLoginUserMutation } from '../api/loginApiSlice';
import useAuthContext from '../../../hooks/useAuthContext';
import { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

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
    <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loginLoading}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
