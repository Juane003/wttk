import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const TrackoutLogo: React.FC<LogoProps> = ({
  width = 500,
  height = 500,
  color = "black",
}) => (
  <View style={{ width, height }}>
    <Svg width={width} height={height} viewBox="0 0 1024 1024">
      <G
        transform="translate(0,1024) scale(0.1,-0.1)"
        fill={color}
        stroke="none"
      >
        <Path d="M3625 3350 c-11 -4 -67 -13 -125 -19 -139 -16 -175 -26 -199 -58 -25 -31 -27 -89 -5 -122 50 -71 229 -67 307 7 43 40 57 75 57 136 0 60 -5 67 -35 56z" />
        <Path d="M6411 3667 c-138 -72 -173 -332 -65 -474 79 -103 261 -97 336 12 79 115 71 330 -15 424 -57 62 -178 80 -256 38z" />
      </G>
    </Svg>
  </View>
);

export default TrackoutLogo;
