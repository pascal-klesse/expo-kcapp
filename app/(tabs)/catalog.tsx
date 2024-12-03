import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type FineType = {
  id: string;
  name: string;
  amount: number;
};

export default function CatalogScreen() {
  // Example data - replace with real data from your backend
  const fines: FineType[] = [
    {
      id: '1',
      name: 'Zu spät zum Training',
      amount: 5,
    },
    {
      id: '2',
      name: 'Trikot vergessen',
      amount: 10,
    },
    {
      id: '3',
      name: 'Nicht abgemeldet',
      amount: 15,
    },
  ];

  const renderItem = ({ item }: { item: FineType }) => (
    <TouchableOpacity style={styles.fineItem}>
      <View style={styles.fineContent}>
        <Text style={styles.fineName}>{item.name}</Text>
        <Text style={styles.amount}>{item.amount}€</Text>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={theme.colors.muted} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Keine Strafen im Katalog</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: 90, // Add padding for tab bar
  },
  listContent: {
    padding: 16,
  },
  fineItem: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fineContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 12,
  },
  fineName: {
    fontSize: 16,
    color: theme.colors.foreground,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.muted,
    marginTop: 24,
  },
});
