import React from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  G,
  ClipPath,
  Defs,
  Filter,
  FeFlood,
  FeBlend,
  FeGaussianBlur,
  Rect,
} from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 83, height = 36 }: LogoProps) {
  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} viewBox='0 0 83 36' fill='none'>
        <G clipPath='url(#clip0_99_2)'>
          <G filter='url(#filter0_f_99_2)'>
            <Path
              d='M1.61133 29V7.78906H10.2832C15.0586 7.78906 17.9883 10.7773 17.9883 15.084C17.9883 19.4785 15 22.3496 10.1367 22.3496H6.5918V29H1.61133ZM6.5918 18.3945H9.22852C11.5723 18.3945 12.832 17.0762 12.832 15.084C12.832 13.0918 11.5723 11.832 9.22852 11.832H6.5918V18.3945ZM20.5078 29V7.78906H25.4883V24.9277H34.3945V29H20.5078ZM41.9824 7.78906V29H37.002V7.78906H41.9824ZM45.2051 29V7.78906H59.5898V11.8613H50.1855V16.3438H58.6523V20.416H50.1855V29H45.2051ZM61.0547 7.78906H66.6504L71.2207 16.6953H71.3965L75.9668 7.78906H81.5332L73.7988 21.8223V29H68.8184V21.8223L61.0547 7.78906Z'
              fill='white'
            />
          </G>
        </G>
        <Defs>
          <Filter
            id='filter0_f_99_2'
            x='-1.38867'
            y='4.78906'
            width='85.9219'
            height='27.2109'
            filterUnits='userSpaceOnUse'
          >
            <FeFlood floodOpacity='0' result='BackgroundImageFix' />
            <FeBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <FeGaussianBlur
              stdDeviation='1.5'
              result='effect1_foregroundBlur_99_2'
            />
          </Filter>
          <ClipPath id='clip0_99_2'>
            <Rect width='83' height='36' fill='white' />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}
