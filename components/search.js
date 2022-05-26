import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Circle,
} from "react-native-svg";

const Search = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={45}
    height={45}
    viewBox="5 -5 36.034 36.032"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="linear-gradient"
        y1={1}
        x2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#bcea64" />
        <Stop offset={1} stopColor="#80c35f" />
      </LinearGradient>
    </Defs>
    <G
      id="Component_21_3"
      data-name="Component 21 \u2013 3"
      transform="translate(7.5 5.5)"
    >
      <G id="Group_30" data-name="Group 30">
        <G transform="matrix(1, 0, 0, 1, -7.5, -5.5)" filter="url(#Path_60)">
          <Path
            id="Path_60-2"
            data-name="Path 60"
            d="M418.333,2969.724a1.049,1.049,0,0,1-.749-.308l-5.434-5.435-.474.322a8.471,8.471,0,0,1-4.778,1.473,9,9,0,0,1-1.284-.094,8.589,8.589,0,0,1-7.216-7.588,8.471,8.471,0,0,1,2.172-6.593,8.563,8.563,0,0,1,6.327-2.81,8.931,8.931,0,0,1,1.446.119,8.549,8.549,0,0,1,7,7.126,8.445,8.445,0,0,1-1.376,6.074l-.322.474,5.435,5.435a1.059,1.059,0,0,1,0,1.5A1.049,1.049,0,0,1,418.333,2969.724ZM406.9,2950.758a6.476,6.476,0,1,0,6.477,6.477A6.484,6.484,0,0,0,406.9,2950.758Z"
            transform="translate(-390.86 -2943.19)"
            fill="url(#linear-gradient)"
          />
        </G>
      </G>
      <Circle
        id="Ellipse_195"
        data-name="Ellipse 195"
        cx={4}
        cy={4}
        r={4}
        transform="translate(4.573 4.496)"
        fill="#c5cbd3"
      />
    </G>
  </Svg>
);

export default Search;
