import { SetRow } from '@/features/workouts/SetRow';
import { ExerciseHeader } from '@/features/workouts/ExerciseHeader';
import { RestTimerRow } from '@/features/workouts/RestTimerRow';
import { SetTableHeader } from '@/features/workouts/SetTableHeader';
import { AddSetButton } from '@/features/workouts/AddSetButton';
import { RpePickerSheet } from '@/features/workouts/RpePickerSheet';
import BigNumber from 'bignumber.js';
import { spacing, useAppTheme } from '@/hooks/useAppTheme'; // Ensure useAppTheme is imported
import { RecordedWeightedExercise } from '@/models/session-models';
import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { WeightAppliesTo } from '@/store/current-session';
// Removed ExerciseSection import
import { Weight } from '@/models/weight';

interface WeightedExerciseProps {
  recordedExercise: RecordedWeightedExercise;
  previousRecordedExercises: RecordedWeightedExercise[];
  toStartNext: boolean;
  isReadonly: boolean;
  showPreviousButton: boolean;

  cycleRepCountForSet: (setIndex: number) => void;
  updateRepCountForSet: (setIndex: number, reps: number | undefined) => void;
  updateWeightForSet: (
    setIndex: number,
    weight: Weight,
    applyTo: WeightAppliesTo,
  ) => void;
  updateRpeForSet: (setIndex: number, rpe: number | undefined) => void;
  updateNotesForExercise: (notes: string) => void;
  onOpenLink: () => void;
  onEditExercise: () => void;
  onRemoveExercise: () => void;
}

export default function WeightedExercise(props: WeightedExerciseProps) {
  const {
    updateRepCountForSet,
    cycleRepCountForSet,
    updateNotesForExercise,
    updateWeightForSet,
    updateRpeForSet,
  } = props;
  const { recordedExercise } = props;
  const { colors } = useAppTheme();

  const [rpeSheetVisible, setRpeSheetVisible] = useState(false);
  const [activeSetIndex, setActiveSetIndex] = useState<number | null>(null);

  const handleOpenRpe = (index: number) => {
    setActiveSetIndex(index);
    setRpeSheetVisible(true);
  };

  const handleSaveRpe = (rpe: number | undefined) => {
    if (activeSetIndex !== null) {
      updateRpeForSet(activeSetIndex, rpe);
    }
    setRpeSheetVisible(false);
    setActiveSetIndex(null);
  };

  const activeSet = activeSetIndex !== null ? recordedExercise.potentialSets[activeSetIndex] : undefined;
  const activeSetContext = activeSet ? `Set ${activeSetIndex! + 1}: ${activeSet.weight.value}kg x ${activeSet.set?.repsCompleted || '-'} reps` : '';

  return (
    <View style={{ marginBottom: 24 }}>
      <ExerciseHeader
        exercise={recordedExercise.blueprint}
        onOpenMenu={() => {
          props.onEditExercise();
        }}
      />

      <TextInput
        placeholder="Add notes here..."
        placeholderTextColor="#666"
        value={recordedExercise.notes}
        onChangeText={updateNotesForExercise}
        style={{
          color: colors.onSurface,
          fontSize: 14,
          marginBottom: 16,
          paddingVertical: 4
        }}
      />

      <RestTimerRow
        timerValue={recordedExercise.blueprint.restBetweenSets.minRest}
        onPress={() => { /* Open timer picker */ }}
      />

      <SetTableHeader />

      <View>
        {recordedExercise.potentialSets.map((set, index) => {
          const distinctHistory = props.previousRecordedExercises?.[0];
          const historySet = distinctHistory?.potentialSets?.[index];
          const prevText = historySet?.set
            ? `${historySet.weight.value} ${historySet.weight.unit === 'kilograms' ? 'kg' : 'lbs'} x ${historySet.set.repsCompleted}`
            : '-';

          return (
            <SetRow
              key={index}
              setNumber={index + 1}
              previous={prevText}
              weight={set.weight.value.toString()}
              reps={(set.set?.repsCompleted !== undefined ? set.set.repsCompleted : '-').toString()}
              rpe={set.set?.rpe ? set.set.rpe.toString() : undefined}
              isCompleted={set.set !== undefined}
              onWeightChange={(val) => {
                const num = parseFloat(val);
                if (!isNaN(num)) {
                  updateWeightForSet(index, new Weight(new BigNumber(num), set.weight.unit), 'thisSet');
                }
              }}
              onRepsChange={(val) => {
                const num = parseInt(val);
                if (!isNaN(num)) {
                  updateRepCountForSet(index, num);
                }
              }}
              onRpePress={() => handleOpenRpe(index)}
              onToggleComplete={() => cycleRepCountForSet(index)}
            />
          );
        })}
      </View>

      <AddSetButton onPress={() => { }} />

      <RpePickerSheet
        visible={rpeSheetVisible}
        initialRpe={activeSet?.set?.rpe}
        setContext={activeSetContext}
        onDismiss={() => setRpeSheetVisible(false)}
        onSave={handleSaveRpe}
      />
    </View>
  );
}
