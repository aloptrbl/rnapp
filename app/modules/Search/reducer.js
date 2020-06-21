import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    logactivity: []
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_LOGACTIVITY: {
            const logactivity = state.logactivity;

            //show loading signal
            if (logactivity.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.LOGACTIVITY_AVAILABLE: {
            let { data } = action;
            let logactivity = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                logactivity.push(item);
            });

            logactivity.reverse();

            return {...state, logactivity, isLoading: false};
        }

        case t.LOGGED_OUT: {
            return {...state, logactivity: []};
        }

        default:
            return state;
    }
};

export default searchReducer;