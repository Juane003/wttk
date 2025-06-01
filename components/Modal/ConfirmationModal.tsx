import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "../ui/modal";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description }: ConfirmationModalProps) => {
    return <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
  >
    <ModalBackdrop />
    <ModalContent>
      <ModalHeader>
        <Text className="text-typography-950">
          {title}
        </Text>
        <ModalCloseButton>
            <AntDesign name="close" size={24} color="black" />
        </ModalCloseButton>
      </ModalHeader>
      <ModalBody>
        <Text className="text-typography-500">
          {description}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          action="secondary"
          onPress={() => {
            onClose()
          }}
        >
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button
          onPress={() => {
            onConfirm()
          }}
        >
          <ButtonText>Confirm</ButtonText>
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default ConfirmationModal;