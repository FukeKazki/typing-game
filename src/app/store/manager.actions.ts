import { createAction } from "@ngrx/store";

export const start = createAction('Game Start')
export const end = createAction('Game End')

export const next = createAction('Next Problem')
