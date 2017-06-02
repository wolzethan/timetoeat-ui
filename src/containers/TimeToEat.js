import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSurvey, fetchSurveyIfNeeded, invalidateSurvey } from '../actions/survey-actions'

class TimeToEat extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch, selectedSurvey } = this.props
        dispatch(fetchSurveyIfNeeded(selectedSurvey))
    }

    render() {
        const { selectedSurvey, questions, isFetching, lastUpdated, name } = this.props
        return (
            <div>
                <p> 
                    { name }
                    { selectedSurvey }
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selectedSurvey, questionsBySurvey } = state
    const {
        isFetching,
        lastUpdated,
        name,
        items: questions
    } = questionsBySurvey[selectedSurvey] || {
        isFetching: true,
        items: []
    }

    return {
        name,
        selectedSurvey,
        questions,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(TimeToEat)