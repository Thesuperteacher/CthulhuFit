
import React, { memo } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SetRowProps {
    setNumber: number;
    previous?: string;
    weight: string;
    reps: string;
    rpe?: string | undefined;
    isCompleted: boolean;
    onWeightChange: (val: string) => void;
    onRepsChange: (val: string) => void;
    onRpePress: () => void;
    onToggleComplete: () => void;
}

export const SetRow = memo(({
    setNumber,
    previous,
    weight,
    reps,
    rpe,
    isCompleted,
    onWeightChange,
    onRepsChange,
    onRpePress,
    onToggleComplete
}: SetRowProps) => {
    const theme = useTheme();

    const textColor = isCompleted ? '#ffffff' : theme.colors.onSurface;
    const placeholderColor = isCompleted ? 'rgba(255,255,255,0.5)' : theme.colors.outline;
    const inputBg = isCompleted ? 'rgba(0,0,0,0.2)' : theme.colors.surfaceVariant;
    const rowBg = isCompleted ? 'rgba(56, 142, 60, 0.3)' : 'transparent'; // Dark green tint

    return (
        <View style={[styles.row, { backgroundColor: rowBg }]}>
            {/* SET */}
            <View style={styles.colSet}>
                <Text variant="titleMedium" style={{ color: isCompleted ? '#fff' : theme.colors.outline, fontWeight: 'bold' }}>
                    {setNumber}
                </Text>
            </View>

            {/* PREVIOUS */}
            <View style={styles.colPrev}>
                <Text variant="bodySmall" style={{ color: isCompleted ? 'rgba(255,255,255,0.7)' : theme.colors.outline, textAlign: 'center' }}>
                    {previous || '-'}
                </Text>
            </View>

            {/* KG */}
            <View style={styles.colInput}>
                <TextInput
                    style={[styles.input, { color: textColor, backgroundColor: inputBg }]}
                    value={weight}
                    onChangeText={onWeightChange}
                    keyboardType="numeric"
                    placeholder="-"
                    placeholderTextColor={placeholderColor}
                    textAlign="center"
                />
            </View>

            {/* REPS */}
            <View style={styles.colInput}>
                <TextInput
                    style={[styles.input, { color: textColor, backgroundColor: inputBg }]}
                    value={reps}
                    onChangeText={onRepsChange}
                    keyboardType="numeric"
                    placeholder="-"
                    placeholderTextColor={placeholderColor}
                    textAlign="center"
                />
            </View>

            {/* RPE */}
            <View style={styles.colAction}>
                <TouchableOpacity
                    onPress={onRpePress}
                    style={[styles.rpeBadge, { backgroundColor: rpe ? theme.colors.primaryContainer : theme.colors.surfaceDisabled }]}
                >
                    <Text variant="labelSmall" style={{ color: rpe ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceDisabled }}>
                        {rpe || 'RPE'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* CHECK */}
            <View style={styles.colCheck}>
                <TouchableOpacity
                    onPress={onToggleComplete}
                    style={[
                        styles.checkButton,
                        { backgroundColor: isCompleted ? '#4caf50' : theme.colors.surfaceDisabled } // Green 500
                    ]}
                >
                    <MaterialCommunityIcons
                        name="check"
                        size={20}
                        color={isCompleted ? '#fff' : theme.colors.onSurfaceDisabled}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12, // More breathing room
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#333', // Subtle separator
    },
    colSet: { width: 40, alignItems: 'center' },
    colPrev: { flex: 2, alignItems: 'flex-start', paddingLeft: 8 }, // wider for text
    colInput: { flex: 1.5, alignItems: 'center', marginHorizontal: 4 },
    colAction: { width: 50, alignItems: 'center' },
    colCheck: { width: 50, alignItems: 'center' },

    input: {
        width: '100%',
        height: 36,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: '600',
        padding: 0, // Remove default padding for center alignment
    },
    rpeBadge: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    checkButton: {
        width: 32,
        height: 32,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
