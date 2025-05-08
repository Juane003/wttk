import { Stack } from "expo-router";

import "@/app/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light"><Stack /></GluestackUIProvider>;
}
