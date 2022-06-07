import React from "react";
import Svg, {
    G,
    Path,
    Circle,
    Rect,
    Defs,
    Stop,
    LinearGradient,
    TSpan,
  } from "react-native-svg";
export function Eye({}) {
  return <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30.203} height={25.641} viewBox="-5 -5 30.203 25.641">
            <Defs>
              <LinearGradient id="linear-gradient" y1={1} x2={1} gradientUnits="objectBoundingBox">
                <Stop offset={0} stopColor="#bcea64" />
                <Stop offset={1} stopColor="#80c35f" />
              </LinearGradient>
            </Defs>
            <G id="Layer_2" data-name="Layer 2" transform="translate(6.101 1.822)">
              <G id="eye" transform="translate(-0.118 -0.118)">
                <Rect id="Rectangle_4425" data-name="Rectangle 4425" width={18} height={18} transform="translate(0.118 0.118)" opacity={0} />
                <Circle id="Ellipse_212" data-name="Ellipse 212" cx={1.14} cy={1.14} r={1.14} transform="translate(7.978 7.978)" fill="#c5cbd3" />
                <G transform="matrix(1, 0, 0, 1, -5.98, -1.7)" filter="url(#Path_2688)">
                  <Path id="Path_2688-2" data-name="Path 2688" d="M17.1,9.938c-.486-.843-3.161-5.076-7.7-4.939C5.19,5.105,2.759,8.8,2.1,9.938a.76.76,0,0,0,0,.76c.479.828,3.039,4.939,7.515,4.939H9.8c4.2-.106,6.641-3.8,7.294-4.939A.76.76,0,0,0,17.1,9.938ZM9.6,12.977a2.659,2.659,0,1,1,2.659-2.659A2.659,2.659,0,0,1,9.6,12.977Z" transform="translate(5.5 0.5)" fill="url(#linear-gradient)" />
                </G>
              </G>
            </G>
          </Svg>;
}
  