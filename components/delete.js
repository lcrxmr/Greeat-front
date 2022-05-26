import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

const Delete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={13.323}
    height={17.129}
    viewBox="0 0 13.323 17.129"
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
    <G id="delete" transform="translate(-5 -3)">
      <Path
        id="Path_2691"
        data-name="Path 2691"
        d="M14.516,3a.952.952,0,0,1,.952.952h1.9a.952.952,0,0,1,0,1.9H5.952a.952.952,0,0,1,0-1.9h1.9A.952.952,0,0,1,8.806,3Z"
        transform="translate(0 0)"
        fill="#c5cbd3"
      />
      <Path
        id="Path_2692"
        data-name="Path 2692"
        d="M6,7H17.419V18.419a1.9,1.9,0,0,1-1.9,1.9H7.9a1.9,1.9,0,0,1-1.9-1.9ZM9.331,8.9a.476.476,0,0,0-.476.476v8.565a.476.476,0,1,0,.952,0V9.379A.476.476,0,0,0,9.331,8.9Zm4.758,0a.476.476,0,0,0-.476.476v8.565a.476.476,0,1,0,.952,0V9.379A.476.476,0,0,0,14.089,8.9Z"
        transform="translate(-0.048 -0.194)"
        fillRule="evenodd"
        fill="url(#linear-gradient)"
      />
    </G>
  </Svg>
);

export default Delete;
