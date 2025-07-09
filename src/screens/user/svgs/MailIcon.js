import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MailIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={16}
      viewBox="0 0 20 16"
      fill="none"
      {...props}
    >
      <Path
        d="M1.364 15.502h3.181V7.775L2.462 4.136 0 4.366v9.772c0 .754.61 1.364 1.364 1.364z"
        fill="#0085F7"
      />
      <Path
        d="M15.454 15.502h3.182c.754 0 1.364-.61 1.364-1.364V4.366l-2.458-.23-2.087 3.639v7.727z"
        fill="#00A94B"
      />
      <Path
        d="M15.454 1.866l-1.869 3.566 1.87 2.343L20 4.365V2.548C20 .862 18.076-.1 16.727.911l-1.273.955z"
        fill="#FFBC00"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.545 7.775l-1.78-3.763 1.78-2.147L10 5.956l5.454-4.09v5.909L10 11.865l-5.455-4.09z"
        fill="#FF4131"
      />
      <Path
        d="M0 2.547v1.819l4.545 3.409v-5.91L3.273.912C1.923-.1 0 .862 0 2.547z"
        fill="#E51C19"
      />
    </Svg>
  )
}

export default MailIcon;
