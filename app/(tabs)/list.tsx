import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../../constants/theme';

type FineEntry = {
  id: string;
  username: string;
  fineName: string;
  amount: number;
  timestamp: Date;
};

export default function ListScreen() {
  // Example data - replace with real data from your backend
  const fines: FineEntry[] = [
    {
      id: '1',
      username: 'Max Mustermann',
      fineName: 'Zu spät zum Training',
      amount: 5,
      timestamp: new Date(),
    },
    {
      id: '2',
      username: 'Anna Schmidt',
      fineName: 'Trikot vergessen',
      amount: 10,
      timestamp: new Date(Date.now() - 86400000), // yesterday
    },
  ];

  const renderItem = ({ item }: { item: FineEntry }) => (
    <View style={styles.fineItem}>
      <View style={styles.fineHeader}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.amount}>{item.amount}€</Text>
      </View>
      <Text style={styles.fineName}>{item.fineName}</Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Keine Strafen vorhanden</Text>
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
  },
  fineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.foreground,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  fineName: {
    fontSize: 14,
    color: theme.colors.foreground,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.muted,
    marginTop: 24,
  },
});
