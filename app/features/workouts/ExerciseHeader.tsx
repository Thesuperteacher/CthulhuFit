
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { ExerciseBlueprint } from '@/models/blueprint-models';
import { PlaceholderImage } from '@/ui/PlaceholderImage';
import { ExerciseRepository } from '@/features/exercises/exercise.repository';

interface ExerciseHeaderProps {
    exercise: ExerciseBlueprint;
    onOpenMenu: () => void;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ exercise, onOpenMenu }) => {
    const theme = useTheme();
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const resolve = async () => {
            const id = exercise.catalogExerciseId || exercise.userExerciseId;
            const source = exercise.catalogExerciseId ? 'catalog' : 'user';
            if (id) {
                const ex = await ExerciseRepository.getById(id, source);
                if (ex && mounted) {
                    const uri = await ExerciseRepository.resolveImage(ex);
                    if (mounted) setImageUri(uri);
                }
            }
        };
        resolve();
        return () => { mounted = false; };
    }, [exercise]);

    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <PlaceholderImage uri={imageUri} size={44} style={styles.thumbnail} />
                <Text variant="titleLarge" style={[styles.title, { color: theme.colors.primary }]}>
                    {exercise.name}
                </Text>
            </View>
            <IconButton icon="dots-vertical" onPress={onOpenMenu} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    thumbnail: {
        marginRight: 12,
        borderRadius: 22, // Circular
    },
    title: {
        fontWeight: 'bold',
        flexShrink: 1,
    }
});
