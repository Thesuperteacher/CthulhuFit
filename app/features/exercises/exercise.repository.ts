
import { catalogService, CatalogExercise } from '@/services/catalog.service';
import { UserExercisesRepository, UserExercise } from './user-exercises.repository';

// Unified type for UI
export interface Exercise {
    id: string; // catalogId or userId
    name: string;
    imageUri?: string | null | undefined;
    source: 'catalog' | 'user';
    muscles: string[];
}

import { ImageCacheService } from '@/services/image-cache.service';

export class ExerciseRepository {

    static async search(query: string): Promise<Exercise[]> {
        const catalogMatches = catalogService.searchExercises(query).map(this.mapCatalogToExercise);

        // Naive: Fetch all user exercises and filter. Optimization: Cache user exercises in memory if needed.
        const userExercises = await UserExercisesRepository.getAll();
        const userMatches = userExercises
            .filter(u => u.name.toLowerCase().includes(query.toLowerCase()))
            .map(this.mapUserToExercise);

        return [...userMatches, ...catalogMatches];
    }

    static async getById(id: string, source: 'catalog' | 'user'): Promise<Exercise | undefined> {
        if (source === 'catalog') {
            const cat = catalogService.getExerciseById(id);
            return cat ? this.mapCatalogToExercise(cat) : undefined;
        } else {
            const usr = await UserExercisesRepository.getById(id);
            return usr ? this.mapUserToExercise(usr) : undefined;
        }
    }

    // Helper to resolve image asynchronously for display
    static async resolveImage(exercise: Exercise): Promise<string | null> {
        if (exercise.source === 'user') {
            return exercise.imageUri || null;
        } else {
            // Catalog: we might have an image path from the catalog object, but valid `Exercise` model here 
            // abstracts that. We might need to look up the catalog item again or store the path in Exercise.
            // Let's optimize: Store the primary image path in the Exercise model?
            // For now, let's re-fetch to keep 'Exercise' minimal.
            const cat = catalogService.getExerciseById(exercise.id);
            if (!cat || !cat.images || cat.images.length === 0) return null;

            return ImageCacheService.getLocalImageUri(cat.id, cat.images[0]);
        }
    }

    private static mapCatalogToExercise(c: CatalogExercise): Exercise {
        return {
            id: c.id,
            name: c.name,
            source: 'catalog',
            muscles: c.primaryMuscles,
            // imageUri is NOT resolved here to keep search fast. Resolved on demand.
        };
    }

    private static mapUserToExercise(u: UserExercise): Exercise {
        return {
            id: u.id,
            name: u.name,
            imageUri: u.imageUri,
            source: 'user',
            muscles: u.primaryMuscles || [],
        };
    }
}
