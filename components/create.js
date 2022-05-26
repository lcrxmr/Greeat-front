import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  G,
  Circle,
  Path,
} from "react-native-svg";

const Create = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24.102}
    height={23.215}
    viewBox="0 0 24.102 23.215"
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
          id="Rectangle_4420"
          data-name="Rectangle 4420"
          width={21.59}
          height={21.584}
          fill="url(#linear-gradient)"
        />
      </ClipPath>
    </Defs>
    <G
      id="Component_18_2"
      data-name="Component 18 \u2013 2"
      transform="translate(0 0)"
    >
      <G
        id="Group_327"
        data-name="Group 327"
        transform="translate(-178.514 -26.429)"
      >
        <G
          id="Group_326"
          data-name="Group 326"
          transform="translate(178.947 26.429)"
        >
          <Circle
            id="Ellipse_34"
            data-name="Ellipse 34"
            cx={5.5}
            cy={5.5}
            r={5.5}
            transform="translate(12.67)"
            fill="#011936"
          />
          <G
            id="Group_868"
            data-name="Group 868"
            transform="translate(-0.433 1.631)"
          >
            <G id="Group_867" data-name="Group 867" clipPath="url(#clip-path)">
              <Path
                id="Path_2672"
                data-name="Path 2672"
                d="M10.119,0h1.349c.368.048.738.081,1.1.146a10.574,10.574,0,0,1,6.8,4.121,10.463,10.463,0,0,1,2.016,8.547,10.381,10.381,0,0,1-3.655,6.228,10.514,10.514,0,0,1-8.4,2.442,10.384,10.384,0,0,1-5.673-2.6,10.626,10.626,0,0,1-3.5-6.207c-.072-.4-.113-.8-.168-1.206V10.12C.047,9.759.083,9.4.144,9.038A10.62,10.62,0,0,1,3.11,3.229,10.577,10.577,0,0,1,8.934.167C9.327.1,9.724.056,10.119,0M9.9,11.69v.285c0,1.166,0,2.332,0,3.5a.895.895,0,1,0,1.788.022c.008-1.18,0-2.36,0-3.54V11.69h.28c1.166,0,2.332,0,3.5,0A.9.9,0,1,0,15.5,9.9c-1.18-.008-2.36,0-3.54,0h-.269V9.623c0-1.166,0-2.332,0-3.5A.9.9,0,1,0,9.9,6.083c-.008,1.187,0,2.374,0,3.561V9.9h-.29c-1.159,0-2.318,0-3.477,0a.9.9,0,0,0-.732.3.854.854,0,0,0-.15.944.845.845,0,0,0,.828.543q1.77,0,3.54,0H9.9"
                transform="translate(0 -0.001)"
                fill="url(#linear-gradient)"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default Create;