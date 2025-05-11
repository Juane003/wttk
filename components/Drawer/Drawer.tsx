import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";

import React, { PropsWithChildren } from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: number[];
} & PropsWithChildren;

const Drawer = ({ isOpen, onClose, children, snapPoints }: DrawerProps) => {
  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={snapPoints}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {children}
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default Drawer;
