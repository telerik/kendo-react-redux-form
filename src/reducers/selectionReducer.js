let initialState = {
    isNew: true,
    selectedRow: -1
};

export default function selectionReducer(state = initialState, action) {
    switch (action.type) {
        case "TOGGLE_NEW":
            return Object.assign({ isNew: action.isNew, selectedRow: -1 }, {})
        case "CHANGE_SELECT": {
            return Object.assign({ isNew: false, selectedRow: action.index })
        }
        default:
            return state
    }
}