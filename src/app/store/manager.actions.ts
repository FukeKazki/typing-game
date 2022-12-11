import { createAction } from "@ngrx/store";

export const start = createAction('Game Start')
export const end = createAction('Game End')

export const next = createAction('Next Problem')
export const miss = createAction('Miss Typing')
export const success = createAction('Success Typing')

export const calcScore = createAction('Calc Score')
