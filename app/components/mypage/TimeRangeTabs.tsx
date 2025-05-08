import { View, Text, TouchableOpacity } from 'react-native';

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

interface TimeRangeTabsProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const timeRangeLabels = {
  short_term: '4weeks',
  medium_term: '6months',
  long_term: '1year',
};

export default function TimeRangeTabs({
  timeRange,
  onTimeRangeChange,
}: TimeRangeTabsProps) {
  return (
    <View className='mt-2'>
      <View className='flex-row justify-between border-b border-gray-800'>
        {Object.entries(timeRangeLabels).map(([range, label]) => (
          <TouchableOpacity
            key={range}
            onPress={() => onTimeRangeChange(range as TimeRange)}
            className={`py-2 ${
              timeRange === range ? 'border-b-2 border-[#1DB954]' : ''
            }`}
          >
            <Text
              className={`px-10 ${
                timeRange === range
                  ? 'text-white font-bold'
                  : 'text-gray-400 font-bold'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
