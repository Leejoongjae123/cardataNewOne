'use client';
import { useFormStatus } from 'react-dom';
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

export default function SignInButton({ signInAction, dictionary, language }) {
  const { pending } = useFormStatus();
  
  return (
    <Button
      type='submit'
      className="w-full text-white"
      formAction={signInAction}
      color="primary"
      isLoading={pending}
      spinner={<Spinner size="sm" color="white" />}
    >
      {dictionary.signIn.signin[language]}
    </Button>
  );
}