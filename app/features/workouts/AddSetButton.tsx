
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface AddSetButtonProps {
    onPress: () => void;
}

export const AddSetButton: React.FC<AddSetButtonProps> = ({ onPress }) => {
    return (
        <Button
            mode="contained-tonal"
            onPress={onPress}
            icon="plus"
            style={styles.btn}
            contentStyle={{ height: 48 }}
        >
            Add Set
        </Button>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        marginTop: 12,
    }
});
