import axios from 'axios'

const api_base = process.env.REACT_APP_URL

export const respondToQuestion = function (survey_id, question_id, data) {
    return axios.put(`${api_base}/surveys/${survey_id}/respond`, { data })
        .then(response => response.data)
}

export const getSurvey = function (survey_id) {
    return axios.get(`${api_base}/surveys/${survey_id}`)
        .then(response => response.data)
}