import { getSurvey } from '../services/survey'

export const NEXT_QUESTION      = 'NEXT_QUESTION'
export const RESPOND_TO         = 'RESPOND_TO'
export const REQUEST_SURVEY     = 'REQUEST_SURVEY'
export const RECEIVE_SURVEY     = 'RECEIVE_SURVEY'
export const INVALIDATE_SURVEY  = 'INVALIDATE_SURVEY'
export const SELECT_SURVEY      = 'SELECT_SURVEY'

export function respondToQuestion({ question_id, response_id }) {
    return {
        type: RESPOND_TO,
        question_id,
        response_id
    }
}

export function selectSurvey(survey_id) {
    return {
        type: SELECT_SURVEY,
        survey_id
    }
}

export function invalidateSurvey(survey_id) {
    return {
        type: INVALIDATE_SURVEY,
        survey_id
    }
}

function requestSurvey(survey_id) {
    return {
        type: REQUEST_SURVEY,
        survey_id,
        requestedAt: Date.now()
    }
}

function receiveSurvey(survey_id, json) {
    return {
        type: RECEIVE_SURVEY,
        survey_id,
        name: json.name,
        questions: json.questions,
        receivedAt: Date.now()
    }
}

function fetchSurvey(survey_id) {
    return dispatch => {
        dispatch(requestSurvey(survey_id))
        return getSurvey(survey_id)
            .then(json => dispatch(receiveSurvey(survey_id, json)))
    }
}

function shouldFetchSurvey(state, survey_id) {
    const questions = state.questionsBySurvey[survey_id]
    if (!questions) {
        return true
    } else if (questions.isFetching) {
        return false
    } else {
        return questions.didInvalidate
    }
}

export function fetchSurveyIfNeeded(survey_id) {
    return (dispatch, getState) => {
        if (shouldFetchSurvey(getState(), survey_id)) {
            return dispatch(fetchSurvey(survey_id))
        }
    }
}