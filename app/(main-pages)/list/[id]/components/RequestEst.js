"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function RequestEst({
  title,
  description,
  thumbImage,
  productId,
  id,
  userId,
  language,
  dictionary,
  profiles,
  titlekr,
}) {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onOpenChange: onOpenChange3,
  } = useDisclosure();
  const supabase = createClient();

  const handleRequestEst = async () => {
    console.log("profiles:", profiles);
    if (!profiles.recommenderEmail) {
      onOpen3();
      return;
    }

    const { data: carData, error: carError } = await supabase
      .from("cardata")
      .update({ isRequest: true })
      .eq("id", id);

    if (carError) {
      console.error("Error updating car data:", carError);
      return;
    }

    const { data: existingData, error: existingError } = await supabase
      .from("requests")
      .select("*")
      .eq("productId", id)
      .eq("userId", userId)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      console.error(existingError);
      onOpen2();
      return;
    }

    if (!existingData) {
      const { data, error } = await supabase.from("requests").insert([
        {
          productId: id,
          userId: userId,
          encarId: productId,
          thumbImage: thumbImage,
          title: title,
          description: description,
          titlekr: titlekr,
        },
      ]);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
      onOpen1();
    } else {
      console.log("Request with this productId already exists.");
      onOpen2();
    }
  };
  const router = useRouter();

  return (
    <>
      <Button
        className="button bg-primary px-3 text-white w-full"
        uk-tooltip="title: Ask; offset: 8"
        onPress={() => {
          handleRequestEst();
        }}
        size="sm"
      >
        {dictionary.detail.applyEstimate[language]}
      </Button>

      <Modal isOpen={isOpen1} onOpenChange={onOpenChange1}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.detail.applyModalTitle[language]}
              </ModalHeader>
              <ModalBody>
                <p className="text-lg font-semibold">
                  {dictionary.detail.applyModalContents1[language]}
                </p>
                <p className="text-medium ">
                  {dictionary.detail.applyModalContents2[language]}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={onClose}
                >
                  {dictionary.detail.applyModalButton[language]}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.detail.applyModalTitle[language]}
              </ModalHeader>
              <ModalBody>
                <p className="text-lg font-semibold">
                  {dictionary.detail.applyModalContents1_1[language]}
                </p>
                <p className="text-medium ">
                  {dictionary.detail.applyModalContents2[language]}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={onClose}
                >
                  {dictionary.detail.applyModalButton[language]}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen3} onOpenChange={onOpenChange3}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {dictionary.detail.error[language]}
              </ModalHeader>
              <ModalBody>
                <p>{dictionary.detail.noinfo[language]}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
                  color="primary"
                  onPress={() => {
                    onClose();
                    router.push("/mypage");
                  }}
                >
                  {dictionary.detail.confirm[language]}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RequestEst;
