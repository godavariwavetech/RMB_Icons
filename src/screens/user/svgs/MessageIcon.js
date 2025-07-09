import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MessageIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={19}
      viewBox="0 0 20 19"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.421.026a9.474 9.474 0 00-8.212 14.2c.163.283.191.628.053.925l-.808 1.74a1.421 1.421 0 001.257 2.083h7.71a9.474 9.474 0 100-18.948zM7.58 6.658a.947.947 0 000 1.895h1.895a.947.947 0 100-1.895H7.58zm0 3.79a.947.947 0 000 1.894h5.685a.947.947 0 100-1.895H7.579z"
        fill="#2264D2"
      />
    </Svg>
  )
}

export default MessageIcon
