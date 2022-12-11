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

export const selectMiss = createSelector(
  feature,
  (state) => state.miss
)

export const selectSuccess = createSelector(
  feature,
  (state) => state.success
)

export const selectVaridity = createSelector(
  feature,
  (state) => state.validity
)
