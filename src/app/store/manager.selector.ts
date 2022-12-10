import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureName, State } from "./manager.reducer";

export const feature = createFeatureSelector<State>(featureName)

export const selectCount = createSelector(
  feature,
  (state) => state.count
)

export const selectScore = createSelector(
  feature,
  (state) => state.score
)
