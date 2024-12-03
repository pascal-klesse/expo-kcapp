import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { CustomHeader } from '@/components/CustomHeader';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        header: ({ route, options }) => (
          <CustomHeader
            title={options.headerTitle as string || options.title || route.name}
            rightElement={
              route.name === 'list' ? (
                <TouchableOpacity>
                  <Ionicons name="add" size={24} color={theme.colors.foreground} />
                </TouchableOpacity>
              ) : undefined
            }
          />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 1,
          borderColor: theme.colors.border,
          elevation: 0,
          height: 70,
          paddingBottom: 0,
          paddingTop: 3,
          shadowOpacity: 0,
          position: 'absolute',
        },
        tabBarItemStyle: {
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          lineHeight: 10,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerTitle: 'Übersicht',
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Liste',
          headerTitle: 'Strafen',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Katalog',
          headerTitle: 'Strafenkatalog',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Mehr',
          headerTitle: 'Einstellungen',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ellipsis-horizontal" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
