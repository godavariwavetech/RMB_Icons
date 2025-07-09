import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={19}
      viewBox="0 0 17 19"
      fill="none"
      {...props}
    >
      <Path
        d="M8.474.102C4.12.102.579 3.642.579 7.996.58 12.302 4.116 18.9 8.474 18.9s7.895-6.597 7.895-10.903c0-4.353-3.542-7.894-7.895-7.894zm0 11.278A3.388 3.388 0 015.09 7.996a3.388 3.388 0 013.384-3.383 3.388 3.388 0 013.383 3.383 3.388 3.388 0 01-3.383 3.384z"
        fill="#2264D2"
      />
    </Svg>
  )
}

export default LocationIcon;
