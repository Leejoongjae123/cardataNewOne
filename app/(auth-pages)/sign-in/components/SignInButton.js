'use client';
import { useFormStatus } from 'react-dom';
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

export default function SignInButton({ signInAction, dictionary, language }) {
  
  return (
    <Button
      type='submit'
      className="w-full text-white"
      formAction={signInAction}
      color="primary"
      spinner={<Spinner size="sm" color="white" />}
    >
      {dictionary.signIn.signin[language]}
    </Button>
  );
}