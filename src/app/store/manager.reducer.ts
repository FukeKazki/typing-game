import { createReducer, on } from "@ngrx/store";
import { end, next, start } from "./manager.actions";

export const featureName = 'manager'

export interface State {
  score: number;
  count: number;
}

export const initialState: State = {
  score: 0,
  count: 0
}

export const managerReducer = createReducer(
  initialState,
  on(start, (state) => ({
    ...state,
    score: 0,
    count: 0
  })),
  on(end, (state) => ({
    ...state
  })),
  on(next, (state) => ({
    ...state,
    count: state.count + 1,
    score: state.score + 10
  }))
)
