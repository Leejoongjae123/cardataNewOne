"use client";
import { useFormStatus } from "react-dom";
import { useSearchParams } from 'next/navigation';
import { Spinner } from "@nextui-org/spinner";
import { useEffect, Suspense,useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function SignInButton({ signInAction, dictionary, language }) {
  const { pending } = useFormStatus();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const error = searchParams.get('error');
    if (error?.includes('Invalid')) {
      setErrorMessage(dictionary.signIn.errorMessage1[language]);
      onOpen();
    } else if (error?.includes('missing')) {
      setErrorMessage(dictionary.signIn.errorMessage2[language]);
      onOpen();
    }
  }, [searchParams]);

  console.log("searchParams:", searchParams);
  
  return (
    <Suspense fallback={<Spinner />}>
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {dictionary.signIn.errorTitle[language]}
                </ModalHeader>
                <ModalBody>
                  <p>
                    {errorMessage}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button className="text-white" color="primary" onPress={onClose}>
                    {dictionary.signIn.errorConfirm[language]}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button
          type="submit"
          className="w-full text-white"
          formAction={signInAction}
          color="primary"
          isLoading={pending}
        >
          {dictionary.signIn.signin[language]}
        </Button>
      </>
    </Suspense>
  );
}
