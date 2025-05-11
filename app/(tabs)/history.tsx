import useGetWorkouts from "@/api/workouts/useGetWorkouts";
import WorkoutCardList from "@/components/history/WorkoutCardList";
import PageContainer from "@/components/PageContainter/PageContainer";

const History = () => {
  const { data: workouts } = useGetWorkouts();

  return (
    <PageContainer scrollable={false} className="p-4">
      {workouts && <WorkoutCardList workouts={workouts} />}
    </PageContainer>
  );
};

export default History;
