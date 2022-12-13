import { createReducer, on } from "@ngrx/store";
import { Problem } from "../services/manager.service";
import { calcScore, end, miss, next, setProblem, start, success } from "./manager.actions";

export const featureName = 'manager'

export interface State {
  score: number;
  count: number;
  miss: number;
  success: number;
  validity: number; // 正答率
  problems: Problem[];
}

export const initialState: State = {
  score: 0,
  count: 0,
  miss: 0,
  success: 0,
  validity: 0,
  problems: []
}

export const managerReducer = createReducer(
  initialState,
  on(start, (state) => ({
    ...state,
    score: 0,
    count: 0,
    miss: 0,
    success: 0
  })),
  on(end, (state) => ({
    ...state
  })),
  on(next, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(miss, (state) => ({
    ...state,
    miss: state.miss + 1
  })),
  on(success, (state) => ({
    ...state,
    success: state.success + 1
  })),
  on(calcScore, (state) => ({
    ...state,
    score: state.success,
    validity: (state.success / (state.success + state.miss)) * 100
  })),
  on(setProblem, (state, {payload}) => ({
    ...state,
    problems: payload.problems
  }))
)
