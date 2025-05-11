import { getLastUnfinishedWorkout } from "@/storage/workout.storage";
import { useQuery } from "@tanstack/react-query";

const useGetUnfinishedWorkout = () => {
  return useQuery({
    queryKey: ["unfinished-workout"],
    queryFn: getLastUnfinishedWorkout,
  });
};

export default useGetUnfinishedWorkout;
