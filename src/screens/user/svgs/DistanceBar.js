import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function DistanceBar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={89}
      viewBox="0 0 10 89"
      fill="none"
      {...props}
    >
      <Path stroke="#3D3D3D" d="M5 59L5 6" />
      <Circle cx={5} cy={5} r={4.5} fill="#23AF72" stroke="#fff" />
      <Circle cx={5} cy={61} r={4.5} fill="#DE203C" stroke="#fff" />
    </Svg>
  )
}

export default DistanceBar
