import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { CheckIcon, DeleteIcon } from "../../assets/Icons";
import PropTypes from "prop-types";
import { useState } from "react";
import CollectionCenterService from "../../services/CollectionCenterService";

export default function ModalCollectionCenter({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Booleano para establecer si se ha recibido respuesta
  // eslint-disable-next-line no-unused-vars
  const [loadedDisable, setLoadedDisable] = useState(false);

  const onPress = async () => {
    try {
      const object = {
        id_collection_center: item.id_collection_center,
        active: item.active == "1" ? "0" : "1",
      };
      const response = await CollectionCenterService.disableCollectionCenter(
        object
      );
      console.log(response);
      setLoadedDisable(true);
      window.location.reload(false);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log(error);
        setLoadedDisable(false);
        throw new Error("Invalid response from server");
      }
    }
    onClose(); // Cierra el modal después de ejecutar onPress
  };

  return (
    <>
      {item.active == "1" ? (
        <Tooltip color="danger" content="Disable" closeDelay={0}>
          <Button
            onPress={onOpen}
            color="danger"
            size="sm"
            variant="light"
            isIconOnly
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip color="primary" content="Enable" closeDelay={0}>
          <Button
            onPress={onPress}
            color="primary"
            size="sm"
            variant="light"
            isIconOnly
          >
            <CheckIcon />
          </Button>
        </Tooltip>
      )}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onClose} // Usar onClose para cerrar el modal cuando se haga clic fuera de él
        className="max-w-[350px]"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Disable {item.name}?
          </ModalHeader>
          <ModalBody>
            <p>
              By disabling it, transactions related to this cannot be carried
              out.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onPress}>
              Yes
            </Button>
            <Button color="primary" onPress={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

ModalCollectionCenter.propTypes = {
  item: PropTypes.object,
};
