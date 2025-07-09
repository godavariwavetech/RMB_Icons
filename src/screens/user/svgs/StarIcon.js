import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath
} from "react-native-svg"

function StarIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_705_613)">
        <Path
          d="M5.602 8.944l-2.18 1.146a.64.64 0 01-.929-.675l.416-2.428-1.763-1.719A.64.64 0 011.5 4.176l2.438-.354 1.09-2.209a.64.64 0 011.148 0l1.09 2.209 2.437.354a.64.64 0 01.354 1.092l-1.763 1.72.416 2.427a.64.64 0 01-.929.675l-2.18-1.146z"
          fill="url(#paint0_linear_705_613)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_705_613"
          x1={5.60156}
          y1={1.25591}
          x2={5.60156}
          y2={10.1649}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFE61C" />
          <Stop offset={1} stopColor="#FFA929" />
        </LinearGradient>
        <ClipPath id="clip0_705_613">
          <Path
            fill="#fff"
            transform="translate(.022 .13)"
            d="M0 0H11.1595V11.1595H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default StarIcon;
