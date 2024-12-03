import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';
import { LineChart } from 'react-native-chart-kit';
import { useWindowDimensions } from 'react-native';

type TimeRange = '1W' | '1M' | '3M' | '1Y' | 'ALL';

export default function DashboardScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');

  // Example data - replace with real data from your backend
  const chartData = {
    labels: ['', '', '', '', '', ''], // Empty labels for clean look
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const totalAmount = 150; // Example total
  const changeAmount = +35; // Example change (positive)

  const timeRanges: TimeRange[] = ['1W', '1M', '3M', '1Y', 'ALL'];

  const rankingData = [
    { name: 'Max Mustermann', total: 150 },
    { name: 'Anna Schmidt', total: 120 },
    { name: 'Tom Weber', total: 90 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalAmount}>{totalAmount}€</Text>
        <Text style={[styles.changeAmount, { color: changeAmount >= 0 ? theme.colors.primary : theme.colors.destructive }]}>
          {changeAmount >= 0 ? '+' : ''}{changeAmount}€
        </Text>
      </View>

      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={windowWidth + 16} // Add extra width to compensate for right padding
          height={220}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          segments={4}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            decimalPlaces: 0,
            color: (opacity = 1) => theme.colors.primary,
            style: {
              borderRadius: 0,
            },
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
            propsForDots: {
              r: '0',
            },
            formatYLabel: () => '',
            formatXLabel: () => '',
          }}
          bezier
          style={{
            marginLeft: -16,
            paddingRight: 0,
            borderRadius: 0
          }}
        />
      </View>

      <View style={styles.timeRangeContainer}>
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeButton,
              selectedRange === range && styles.timeRangeButtonSelected,
            ]}
            onPress={() => setSelectedRange(range)}
          >
            <Text
              style={[
                styles.timeRangeText,
                selectedRange === range && styles.timeRangeTextSelected,
              ]}
            >
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ranking</Text>
        {rankingData.map((user, index) => (
          <View key={index} style={styles.rankingItem}>
            <Text style={styles.rankingPosition}>#{index + 1}</Text>
            <Text style={styles.rankingName}>{user.name}</Text>
            <Text style={styles.rankingTotal}>{user.total}€</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: 90, // Add padding for tab bar
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  },
  changeAmount: {
    fontSize: 16,
    marginTop: 4,
  },
  chartWrapper: {
    marginVertical: 20,
    overflow: 'hidden',
  },
  chart: {
    marginRight: -16, // Remove right padding
    marginLeft: -16, // Remove left padding
    paddingRight: 0,
    paddingLeft: 0,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  timeRangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  timeRangeButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  timeRangeText: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  timeRangeTextSelected: {
    color: theme.colors.primaryForeground,
  },
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.foreground,
    marginBottom: 16,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  rankingPosition: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    width: 40,
  },
  rankingName: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.foreground,
  },
  rankingTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  },
});
