
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { OffsetDateTime, Duration } from '@js-joda/core';

interface RestTimerBarProps {
    timerEndTime?: OffsetDateTime; // When the timer effectively ends
    onAddRest: (seconds: number) => void;
    onSubtractRest: (seconds: number) => void;
    onSkip: () => void;
}

export const RestTimerBar: React.FC<RestTimerBarProps> = ({
    timerEndTime,
    onAddRest,
    onSubtractRest,
    onSkip
}) => {
    const theme = useTheme();
    const [timeLeft, setTimeLeft] = useState<string>("00:00");

    useEffect(() => {
        if (!timerEndTime) return;

        const tick = () => {
            const now = OffsetDateTime.now();
            const diff = Duration.between(now, timerEndTime);

            if (diff.isNegative()) {
                setTimeLeft("00:00");
                return;
            }

            const minutes = Math.floor(diff.seconds() / 60);
            const seconds = diff.seconds() % 60;
            setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [timerEndTime]);

    if (!timerEndTime || OffsetDateTime.now().isAfter(timerEndTime)) return null;

    return (
        <View style={[styles.container, { backgroundColor: '#1e1e1e' }]}>
            <TouchableOpacity onPress={() => onSubtractRest(15)} style={styles.btnSmall}>
                <Text variant="titleMedium" style={{ color: '#fff' }}>-15</Text>
            </TouchableOpacity>

            <Text style={styles.timerText}>{timeLeft}</Text>

            <TouchableOpacity onPress={() => onAddRest(15)} style={styles.btnSmall}>
                <Text variant="titleMedium" style={{ color: '#fff' }}>+15</Text>
            </TouchableOpacity>

            <Button mode="contained" onPress={onSkip} style={styles.skipBtn} buttonColor={theme.colors.primary}>
                Skip
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    btnSmall: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        minWidth: 50,
        alignItems: 'center',
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        fontVariant: ['tabular-nums'],
    },
    skipBtn: {
        borderRadius: 6,
    }
});
