import { combineReducers } from 'redux'

import {
    INVALIDATE_SURVEY, RECEIVE_SURVEY,
    REQUEST_SURVEY, SELECT_SURVEY
} from '../actions/survey-actions'

function selectedSurvey(state = 1, action) {
    switch (action.type) {
        case SELECT_SURVEY:
            return action.survey_id
        default:
            return state
    }
}

function questions(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_SURVEY:
            Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_SURVEY:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_SURVEY:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                name: action.name,
                items: action.questions,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function questionsBySurvey(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SURVEY:
        case RECEIVE_SURVEY:
        case REQUEST_SURVEY:
            return Object.assign({}, state, {
                [action.survey_id] : questions(state[action.survey_id], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    questionsBySurvey,
    selectedSurvey
})

export default rootReducer