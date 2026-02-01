
import React, { useState } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PlaceholderImageProps {
    uri?: string | null;
    size?: number;
    style?: StyleProp<ImageStyle>;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ uri, size = 50, style }) => {
    const theme = useTheme();
    const [error, setError] = useState(false);

    if (uri && !error) {
        return (
            <Image
                source={{ uri }}
                style={[{ width: size, height: size, borderRadius: 8, backgroundColor: theme.colors.surfaceVariant }, style]}
                onError={() => setError(true)}
            />
        );
    }

    return (
        <Surface
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.surfaceVariant,
                },
                style,
            ]}
        >
            <MaterialCommunityIcons name="dumbbell" size={size * 0.5} color={theme.colors.onSurfaceVariant} />
        </Surface>
    );
};
