
import exercisesData from '@/assets/data/exercises.json'; // Direct import for In-Memory
import { match } from 'ts-pattern';

export interface CatalogExercise {
  id: string;
  name: string;
  force: string | null;
  level: string;
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

class CatalogService {
  private exercisesMap: Map<string, CatalogExercise>;
  private exercises: CatalogExercise[];

  constructor() {
    this.exercises = exercisesData as CatalogExercise[];
    this.exercisesMap = new Map(this.exercises.map(ex => [ex.id, ex.name === '3/4 Sit-Up' ? ex.id : ex.id])); // Basic map
    // Re-mapping specifically to ensure ID consistency if needed, but the JSON has 'id'.
    // Actually, let's just use the ID from the JSON.
    this.exercisesMap = new Map();
    this.exercises.forEach(ex => {
        this.exercisesMap.set(ex.id, ex);
    });
  }

  getAllExercises(): CatalogExercise[] {
    return this.exercises;
  }

  getExerciseById(id: string): CatalogExercise | undefined {
    return this.exercisesMap.get(id);
  }

  searchExercises(query: string): CatalogExercise[] {
    const lowerQuery = query.toLowerCase();
    return this.exercises.filter(ex => 
      ex.name.toLowerCase().includes(lowerQuery) || 
      ex.primaryMuscles.some(m => m.toLowerCase().includes(lowerQuery))
    ).slice(0, 50); // Limit results
  }
}

export const catalogService = new CatalogService();
