import { RootState } from '../store';

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
