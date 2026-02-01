
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton, Surface, useTheme, Menu } from 'react-native-paper';
import { ExerciseBlueprint, WeightedExerciseBlueprint } from '@/models/blueprint-models';
import { PlaceholderImage } from '@/ui/PlaceholderImage';
import { ExerciseRepository } from '@/features/exercises/exercise.repository';

interface ExerciseCardProps {
    exercise: ExerciseBlueprint;
    onOpenDetails: () => void;
    onOpenMenu: () => void;
    children: React.ReactNode; // For Sets/Children
    previousPerformance?: string | undefined;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onOpenDetails, onOpenMenu, children, previousPerformance }) => {
    const theme = useTheme();
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const resolve = async () => {
            // Here we need to reconstruct the "Exercise" interface from the blueprint to pass to repo
            // Or generic "resolve" logic.
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
        <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onOpenDetails} style={styles.headerContent}>
                    <PlaceholderImage uri={imageUri} size={48} style={styles.thumbnail} />
                    <View style={styles.headerText}>
                        <Text variant="titleMedium" style={styles.title}>{exercise.name}</Text>
                        {previousPerformance && (
                            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>{previousPerformance}</Text>
                        )}
                    </View>
                </TouchableOpacity>
                <IconButton icon="dots-vertical" onPress={onOpenMenu} />
            </View>

            <View style={styles.content}>
                {children}
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 4,
        marginHorizontal: 8, // Compact
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbnail: {
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
    },
    content: {
        paddingBottom: 8,
    }
});
