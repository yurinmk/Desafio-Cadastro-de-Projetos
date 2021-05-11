const INITIAL_STATE = {
  items: [],
  action: "",
  project: {},
  message: "",
  statusCode: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LIST_PROJECTS":
      return {
        ...state,
        items: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    case "EDIT_PROJECT":
      return {
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    case "FILTER_PROJECTS":
      return {
        ...state,
        items: action.payload.items,
        statusCode: action.payload.statusCode,
      };
    case "ERROR_FILTER_PROJECTS":
      return {
        ...state,
        items: action.payload.items,
      };
    case "HANDLE_CREATE_PROJECT":
      return {
        ...state,
        action: action.payload,
      };
    case "CLOSE_CREATE_PROJECT":
      return {
        ...state,
        action: action.payload,
      };
    case "HANDLE_EDIT_PROJECT":
      return {
        ...state,
        action: action.payload.action,
        project: action.payload.project,
      };
    case "ERROR":
      return {
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    case "STATE_RESET":
      return {
        ...state,
        action: "",
        project: {},
        message: "",
        statusCode: 0,
      };
    default:
      return state;
  }
}
