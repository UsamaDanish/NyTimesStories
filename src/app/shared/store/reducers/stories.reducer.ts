import { createReducer, on } from "@ngrx/store";
import { setStories } from "../actions";
import { Stories } from "src/app/stories/models";

export const initialState = {
    stories: [] as Stories[]
};

export const storiesReducer = createReducer(initialState, on(setStories, (state, { stories }) => ({
    ...state,
    stories: stories
})))