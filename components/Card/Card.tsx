import { cn } from "@/utils/cn";
import { Text, View } from "react-native";

const Card = ({
  children,
  className,
  title,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode | string;
}) => {
  return (
    <View className={cn("rounded-xl w-full", className)}>
      {typeof title === "string" ? (
        <Text className="text-lg">{title}</Text>
      ) : (
        title
      )}
      {children}
    </View>
  );
};

export default Card;
