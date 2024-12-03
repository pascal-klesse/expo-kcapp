import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import {AuthContext} from "@/contexts/AuthContext";

const menuItems = (logout: () => Promise<void>) => [
  {
    title: 'Profil bearbeiten',
    icon: 'person-outline',
    onPress: () => {},
  },
  {
    title: 'Benachrichtigungen',
    icon: 'notifications-outline',
    onPress: () => {},
  },
  {
    title: 'Datenschutz',
    icon: 'shield-outline',
    onPress: () => {},
  },
  {
    title: 'Über',
    icon: 'information-circle-outline',
    onPress: () => {},
  },
  {
    title: 'Ausloggen',
    icon: 'log-out-outline',
    onPress: async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    danger: true,
  },
];

export default function Settings() {
  const router = useRouter();
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems(logout).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => item.onPress()}
          >
            <View style={styles.menuItemContent}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={item.danger ? theme.colors.destructive : theme.colors.foreground}
              />
              <Text
                style={[
                  styles.menuItemText,
                  item.danger && { color: theme.colors.destructive },
                ]}
              >
                {item.title}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.muted}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: 90,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.foreground,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  menuContainer: {
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: theme.colors.foreground,
  },
});
