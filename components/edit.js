import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  G,
  Path,
} from "react-native-svg";

const Edit = (props) => (
  <Svg
    id="Component_40_2"
    data-name="Component 40 \u2013 2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={17}
    height={17}
    viewBox="0 -1 16 16"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#bcea64" />
        <Stop offset={1} stopColor="#80c35f" />
      </LinearGradient>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4423"
          data-name="Rectangle 4423"
          width={13.046}
          height={12.977}
          fill="url(#linear-gradient)"
        />
      </ClipPath>
    </Defs>
    <G id="Group_880" data-name="Group 880">
      <G id="Group_879" data-name="Group 879" clipPath="url(#clip-path)">
        <Path
          id="Path_2674"
          data-name="Path 2674"
          d="M0,296.226c.068-.283.139-.565.2-.849.158-.7.312-1.4.461-2.069l2.611,2.606c-.22.054-.473.118-.726.179L.46,296.6c-.245.059-.336.022-.46-.194v-.178"
          transform="translate(0 -283.647)"
          fill="#011936"
        />
        <Path
          id="Path_2675"
          data-name="Path 2675"
          d="M52.627,69.589,45.94,76.275l-2.62-2.616,6.691-6.685,2.615,2.615"
          transform="translate(-41.893 -64.768)"
          fill="url(#linear-gradient)"
        />
        <Path
          id="Path_2676"
          data-name="Path 2676"
          d="M267.94,1.459c.012-.013.036-.041.062-.068q.5-.5,1.008-1.008a1.173,1.173,0,0,1,1.733,0Q271.3.936,271.86,1.5a.9.9,0,0,1,.006,1.336c-.417.423-.84.841-1.26,1.261a.08.08,0,0,1-.018.014L267.94,1.459"
          transform="translate(-259.114 0.001)"
          fill="#c5cbd3"
        />
      </G>
    </G>
  </Svg>
);

export default Edit;