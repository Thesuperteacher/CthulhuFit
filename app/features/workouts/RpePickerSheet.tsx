
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Button, Surface, Portal, useTheme } from 'react-native-paper';

interface RpePickerSheetProps {
    visible: boolean;
    initialRpe?: number | undefined;
    setContext?: string; // e.g. "Set 1: 60kg x 12 reps"
    onDismiss: () => void;
    onSave: (rpe: number | undefined) => void;
}

export const RpePickerSheet: React.FC<RpePickerSheetProps> = ({
    visible,
    initialRpe,
    setContext,
    onDismiss,
    onSave
}) => {
    const theme = useTheme();
    const [selectedRpe, setSelectedRpe] = useState<number | undefined>(initialRpe);

    useEffect(() => {
        if (visible) {
            setSelectedRpe(initialRpe);
        }
    }, [visible, initialRpe]);

    const rpeOptions = [6, 7, 7.5, 8, 8.5, 9, 9.5, 10];

    // Reset selection if dismissing without saving? No, parent handles "onSave" or "onDismiss"

    const handleSave = () => {
        onSave(selectedRpe);
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={onDismiss}
            >
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onDismiss}
                >
                    {/* Transparent backdrop to close */}
                </TouchableOpacity>

                <Surface style={[styles.sheet, { backgroundColor: theme.colors.surface }]} elevation={4}>
                    {/* Drag Handle */}
                    <View style={styles.handleContainer}>
                        <View style={[styles.handle, { backgroundColor: theme.colors.outline }]} />
                    </View>

                    <Text variant="titleMedium" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 4 }}>
                        Log Set RPE
                    </Text>
                    {setContext && (
                        <Text variant="bodySmall" style={{ textAlign: 'center', color: theme.colors.outline, marginBottom: 24 }}>
                            {setContext}
                        </Text>
                    )}

                    <View style={styles.largeDisplay}>
                        <Text style={{ fontSize: 64, fontWeight: 'bold', color: theme.colors.onSurface }}>
                            {selectedRpe ?? 0}
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.outline, marginTop: -8 }}>
                            RPE
                        </Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
                        {rpeOptions.map(val => (
                            <TouchableOpacity
                                key={val}
                                onPress={() => setSelectedRpe(val)}
                                style={[
                                    styles.optionCircle,
                                    {
                                        backgroundColor: selectedRpe === val ? theme.colors.primary : theme.colors.surfaceVariant,
                                    }
                                ]}
                            >
                                <Text style={{
                                    color: selectedRpe === val ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold'
                                }}>
                                    {val}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Button
                        mode="contained"
                        onPress={handleSave}
                        style={styles.doneButton}
                        contentStyle={{ height: 48 }}
                    >
                        Done
                    </Button>
                </Surface>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40, // Safe area
    },
    handleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    largeDisplay: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    scrollList: {
        gap: 12,
        paddingHorizontal: 8,
        paddingBottom: 24,
    },
    optionCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneButton: {
        borderRadius: 12,
        marginTop: 8,
    }
});
