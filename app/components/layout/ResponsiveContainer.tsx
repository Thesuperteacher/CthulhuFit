import React from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ResponsiveContainerProps {
  children: React.ReactNode;
}

const MAX_WIDTH = 480; // Mobile-like max width for web

export function ResponsiveContainer({ children }: ResponsiveContainerProps) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  
  // Only apply responsive container on web
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  const needsContainer = width > MAX_WIDTH;

  if (!needsContainer) {
    return <>{children}</>;
  }

  return (
    <View style={[styles.outerContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
      <View style={[styles.innerContainer, { backgroundColor: theme.colors.background }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
