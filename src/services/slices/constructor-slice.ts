import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      bun: action.payload
    }),
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      ingredients: [...(state.ingredients || []), action.payload]
    }),
    removeIngredient: (state, action: PayloadAction<string>) => ({
      ...state,
      ingredients: (state.ingredients || []).filter(
        (ingredient) => ingredient.id !== action.payload
      )
    }),
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = state.ingredients || [];
      const newIngredients = [...ingredients];
      const draggedIngredient = newIngredients[dragIndex];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, draggedIngredient);

      return {
        ...state,
        ingredients: newIngredients
      };
    },
    clearConstructor: (state) => ({
      ...state,
      bun: null,
      ingredients: []
    })
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
