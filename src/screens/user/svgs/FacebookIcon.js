import * as React from "react"
import Svg, { Path } from "react-native-svg"

function  FacebookIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M20 10c0 4.991-3.657 9.128-8.438 9.878v-6.987h2.33L14.337 10h-2.774V8.124c0-.79.388-1.562 1.63-1.562h1.261v-2.46s-1.144-.196-2.239-.196c-2.284 0-3.777 1.385-3.777 3.89V10H5.899v2.89h2.54v6.988C3.657 19.128 0 14.991 0 10 0 4.477 4.477 0 10 0s10 4.477 10 10z"
        fill="#1877F2"
      />
      <Path
        d="M13.893 12.89l.443-2.89h-2.774V8.124c0-.79.388-1.562 1.63-1.562h1.261v-2.46s-1.144-.196-2.238-.196c-2.285 0-3.777 1.385-3.777 3.89V10h-2.54v2.89h2.54v6.988a10.073 10.073 0 003.124 0v-6.987h2.33z"
        fill="#fff"
      />
    </Svg>
  )
}

export default FacebookIcon;
