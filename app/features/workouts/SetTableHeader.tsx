
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const SetTableHeader: React.FC = () => {
    const theme = useTheme();
    const headers = ['SET', 'PREVIOUS', 'KG', 'REPS', 'RPE', ''];

    return (
        <View style={styles.row}>
            <View style={styles.colSet}><Text variant="labelSmall" style={styles.headerText}>SET</Text></View>
            <View style={styles.colPrev}><Text variant="labelSmall" style={styles.headerText}>PREVIOUS</Text></View>
            <View style={styles.colInput}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Icon could go here, text sufficient */}
                    <Text variant="labelSmall" style={styles.headerText}>KG</Text>
                </View>
            </View>
            <View style={styles.colInput}><Text variant="labelSmall" style={styles.headerText}>REPS</Text></View>
            <View style={styles.colAction}><Text variant="labelSmall" style={styles.headerText}>RPE</Text></View>
            <View style={styles.colCheck}><Text variant="labelSmall" style={styles.headerText}>✓</Text></View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginBottom: 4,
    },
    headerText: {
        color: '#888', // Fixed dim grey
        fontWeight: 'bold',
    },
    colSet: { width: 40, alignItems: 'center' },
    colPrev: { flex: 2, alignItems: 'flex-start', paddingLeft: 8 },
    colInput: { flex: 1.5, alignItems: 'center', marginHorizontal: 4 },
    colAction: { width: 50, alignItems: 'center' },
    colCheck: { width: 50, alignItems: 'center' },
});
