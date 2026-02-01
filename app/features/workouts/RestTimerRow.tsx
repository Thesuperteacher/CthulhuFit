
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Duration } from '@js-joda/core';

interface RestTimerRowProps {
    timerValue?: Duration; // Or just seconds/string representation of current timer state
    onPress: () => void; // Open picker
}

export const RestTimerRow: React.FC<RestTimerRowProps> = ({ timerValue, onPress }) => {
    const theme = useTheme();

    // Format duration logic or use helper
    const display = timerValue ? `${timerValue.toMinutes()}min ${timerValue.seconds() % 60}s` : '2min 00s';

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <MaterialCommunityIcons name="timer-outline" size={20} color={theme.colors.primary} />
            <Text variant="bodyMedium" style={{ color: theme.colors.primary, fontWeight: '600', marginLeft: 8 }}>
                Rest Timer: {display}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 4,
    },
});
