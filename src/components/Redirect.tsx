import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type RedirectType = {
  to: string;
};

export default function Redirect({ to }: RedirectType) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  });

  return <p>{`You're being redirected to ${to} !`}</p>;
}
