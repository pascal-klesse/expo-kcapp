import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
}

export function CustomHeader({ title, showBackButton, rightElement }: CustomHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 60 }]}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color={theme.colors.foreground} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightElement && (
          <View style={styles.rightContainer}>
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.foreground,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
