import { createAction, props } from "@ngrx/store";
import { Stories } from "../../../stories/models";

export const setStories = createAction('[Stories] set', props<{ stories: Stories[] }>());