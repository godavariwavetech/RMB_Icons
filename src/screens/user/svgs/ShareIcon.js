import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.1.5H3.6A3.6 3.6 0 000 4.1v10.8a3.6 3.6 0 003.6 3.6h10.8a3.6 3.6 0 003.6-3.6v-4.5a.9.9 0 00-1.8 0v4.5a1.8 1.8 0 01-1.8 1.8H3.6a1.8 1.8 0 01-1.8-1.8V4.1a1.8 1.8 0 011.8-1.8h4.5a.9.9 0 000-1.8zm6.827 1.8H11.7a.9.9 0 010-1.8h5.4a.9.9 0 01.9.9v5.4a.9.9 0 01-1.8 0V3.573l-6.564 6.563a.9.9 0 01-1.272-1.272L14.927 2.3z"
        fill="#64748B"
      />
    </Svg>
  )
}

export default ShareIcon
