import { cn } from "@/utils/cn";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PageContainer = ({
  children,
  className,
  contentContainerClassName,
  scrollable = true,
}: {
  children: React.ReactNode;
  className?: string;
  contentContainerClassName?: string;
  scrollable?: boolean;
}) => {
  const Content = scrollable ? ScrollView : View;

  return (
    <SafeAreaView className={cn("bg-backround-dark flex-1 p-4", className)}>
      <Content
        className="flex-1"
        contentContainerClassName={cn("flex-grow", contentContainerClassName)}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
};

export default PageContainer;
