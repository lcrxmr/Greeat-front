import * as React from "react";
import Svg, { Defs, G, Circle, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const ArrowRestaurantDetailsMap = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={75}
    height={75}
    viewBox="0 0 69 69"
    {...props}
  >
    <Defs></Defs>
    <G id="Group_970" data-name="Group 970" transform="translate(-70.5 -385.5)">
      <G transform="matrix(1, 0, 0, 1, 70.5, 385.5)" filter="url(#Ellipse_220)">
        <Circle
          id="Ellipse_220-2"
          data-name="Ellipse 220"
          cx={19}
          cy={19}
          r={19}
          transform="translate(15.5 13.5)"
          fill="#476a70"
          stroke="rgba(0,0,0,0)"
          strokeWidth={1}
        />
      </G>
      <Path
        id="Path_2698"
        data-name="Path 2698"
        d="M440.865,3170.648v-4.256h-8.6v6.633h-3.5v-8.382a1.754,1.754,0,0,1,1.749-1.749l.021,0,.021,0h10.3v-4.256l6,6.006Z"
        transform="translate(-331.485 -2747.832)"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default ArrowRestaurantDetailsMap;
