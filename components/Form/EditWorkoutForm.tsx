import { getWorkoutName } from "@/utils/workout";

import useGetWorkoutById from "@/api/workouts/useGetWorkoutById";
import useUpdateWorkout from "@/api/workouts/useUpdateWorkout";
import useDrawer from "@/hooks/useDrawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Drawer from "../Drawer/Drawer";
import { Button, ButtonText } from "../ui/button";
import { Menu, MenuItem, MenuItemLabel } from "../ui/menu";
import ControlledInput from "./ControlledInput";

const EditWorkoutNameForm = ({ workoutId }: { workoutId: string }) => {
  const { data: workout } = useGetWorkoutById(workoutId);
  const { mutate: updateWorkout } = useUpdateWorkout();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      workout_name: getWorkoutName(workout),
    },
  });

  const handleUpdateWorkout = (data: { workout_name: string }) => {
    updateWorkout({
      id: workoutId,
      name: data.workout_name,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <View className="w-full gap-2">
      <ControlledInput
        control={control}
        name="workout_name"
        placeholder="Workout Name"
      />
      <Button onPress={handleSubmit(handleUpdateWorkout)}>
        <ButtonText>Save</ButtonText>
      </Button>
    </View>
  );
};

const EditWorkoutName = ({
  workoutId,
  toggleAddExercise,
}: {
  workoutId: string;
  toggleAddExercise: () => void;
}) => {
  const { data: workout } = useGetWorkoutById(workoutId);
  const {
    isOpen: isEditWorkoutNameOpen,
    toggleDrawer: toggleEditWorkoutName,
    snapPoints: editWorkoutNameSnapPoints,
  } = useDrawer();

  return (
    <Fragment>
      <View className="flex-row justify-between items-center">
        <Text className="text-3xl text-start text-white">
          {getWorkoutName(workout)}
        </Text>
        <Menu
          trigger={({ ...triggerProps }) => (
            <Button variant="link" {...triggerProps}>
              <ButtonText>
                <AntDesign name="ellipsis1" size={24} color="white" />
              </ButtonText>
            </Button>
          )}
          placement="bottom"
          className="w-[130px]"
        >
          <MenuItem
            key="Add account"
            textValue="Add account"
            className="gap-2"
            onPress={() => toggleEditWorkoutName(true)}
          >
            <AntDesign name="edit" size={16} color="white" />
            <MenuItemLabel size="sm">Edit Name</MenuItemLabel>
          </MenuItem>
          <MenuItem
            key="Community"
            textValue="Community"
            className="gap-2"
            onPress={() => toggleAddExercise()}
          >
            <AntDesign name="plus" size={16} color="white" />
            <MenuItemLabel size="sm">Add Exercise</MenuItemLabel>
          </MenuItem>
        </Menu>
      </View>

      <Drawer
        isOpen={isEditWorkoutNameOpen}
        onClose={() => toggleEditWorkoutName(false)}
        snapPoints={editWorkoutNameSnapPoints}
      >
        <EditWorkoutNameForm workoutId={workoutId} />
      </Drawer>
    </Fragment>
  );
};

export { EditWorkoutName };
