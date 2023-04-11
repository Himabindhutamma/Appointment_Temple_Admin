const data = {
    socket: null,
    events: [],
    liveReader:[],
    staffStatus:[],
};


const Socket = (state = data, action) => {

    let findInd = action.type === 'UPDATE_EVENT' || action.type === 'STOP_EVENT' ?
        [...state.events].findIndex(i => {
            return i.eventId === action.payload.eventId
        })
        :
        -1;
    switch (action.type) {
        case 'LIVE_EVENTS':
            console.log(action.payload);
            state = {...state, events: action.payload };
            break;
        case 'START_EVENT':
            state = {...state, events: [...state.events].push(action.payload)};
            break;
        case 'UPDATE_EVENT':
            if (findInd > -1) {
                state = {...state, events: [...state.events].splice(findInd, 1, action.payload)};
            }
            break;
        case 'STOP_EVENT':
            if (findInd > -1) {
                state = {...state, events: [...state.events].splice(findInd, 1)};
            }
            break;
        case 'SOCKET':
            console.log('saving socket',action);
            state = {...state, socket: action.payload};
            break;
        case 'LIVE_READER':
            state = {...state, liveReader: [...[action.payload],...state.liveReader]};
            break;
        case 'LIVE_STAFF_STATUS':
            state = {...state, staffStatus: action.payload || []};
            break;
        default:
            break;
    }
    return state;
};

export default Socket;
