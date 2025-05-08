import { Box } from "@/components/ui/box";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Text } from "react-native";
import "./global.css";
export default function Index() {
  return (
    <GluestackUIProvider>
      <Box className="flex-1 items-center justify-center">
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Text>Hello World</Text>
      </Box>
    </GluestackUIProvider>
  );
}
