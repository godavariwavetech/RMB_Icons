import { View, Text } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function ProfileCardSkeleton() {
  return (
    <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" padding={20} marginTop={6} justifyContent='space-between'>
      <SkeletonPlaceholder.Item width={56} height={56} borderRadius={50} />
      {/* <SkeletonPlaceholder.Item marginLeft={10}>
        <SkeletonPlaceholder.Item width={200} height={20} />
        <SkeletonPlaceholder.Item marginTop={6} width={150} height={16} />
      </SkeletonPlaceholder.Item> */}
      <SkeletonPlaceholder.Item width={56} height={56} borderRadius={50} />
    </SkeletonPlaceholder.Item>

    <SkeletonPlaceholder.Item 
      height={140} 
      borderRadius={8} 
      marginHorizontal={15}
      marginBottom={20}
      marginTop={10}
    />

    {/* <SkeletonPlaceholder.Item
      height={120}
      borderRadius={8}
      marginHorizontal={15}
      marginBottom={20}
    /> */}

    <SkeletonPlaceholder.Item
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={15}
      marginBottom={20}
      marginTop={16}
    >
      {[1,2].map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          width={'48%'}
          height={110}
          borderRadius={10}
          marginRight={12}
        />
      ))}
    </SkeletonPlaceholder.Item>
     <SkeletonPlaceholder.Item
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={15}
      marginBottom={20}
      // marginTop={16}
    >
      {[1,2].map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          width={'48%'}
          height={110}
          borderRadius={10}
          marginRight={12}
        />
      ))}
    </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item 
      height={160} 
      borderRadius={8} 
      marginHorizontal={15}
      marginBottom={20}
      marginTop={10}
    />

    {/* <SkeletonPlaceholder.Item
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={15}
      marginBottom={20}
      marginTop={38}
    >
      {[1,2,3].map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          width={141}
          height={216}
          borderRadius={10}
          marginRight={12}
        />
      ))}
    </SkeletonPlaceholder.Item> */}

    {/* <SkeletonPlaceholder.Item paddingHorizontal={15}>
      {[1,2,3].map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          width={160}
          height={180}
          borderRadius={8}
        //   marginBottom={20}
        />
      ))}
    </SkeletonPlaceholder.Item> */}

    
  </SkeletonPlaceholder>
  )
}