
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserExercise {
    id: string; // UUID
    name: string;
    imageUri?: string | null;
    primaryMuscles?: string[];
}

const STORAGE_KEY = 'liftlog_user_exercises';

export class UserExercisesRepository {

    static async getAll(): Promise<UserExercise[]> {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            return json ? JSON.parse(json) : [];
        } catch (e) {
            console.warn('Failed to load user exercises', e);
            return [];
        }
    }

    static async save(exercise: UserExercise): Promise<void> {
        const exercises = await this.getAll();
        exercises.push(exercise);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
    }

    static async getById(id: string): Promise<UserExercise | undefined> {
        const exercises = await this.getAll();
        return exercises.find(e => e.id === id);
    }
}
