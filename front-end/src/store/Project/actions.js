import api from "../../utils/api";

export const listProjects = () => (dispatch, getState) => {
  api
    .get("/listProjects")
    .then((success) => {
      dispatch({
        type: "LIST_PROJECTS",
        payload: success.data.success,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.error,
          statusCode: error.response.status,
        },
      });
    });
};

export const createProject = (project) => (dispatch, getState) => {
  api
    .post("/newProject", project)
    .then((success) => {
      dispatch({
        type: "CREATE_PROJECT",
        payload: {
          message: success.data.success,
          statusCode: success.status,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.error,
          statusCode: error.response.status,
        },
      });
    });
};

export const editProject = (id, project) => (dispatch, getState) => {
  api
    .put(`/editProject/${id}`, project)
    .then((success) => {
      dispatch({
        type: "EDIT_PROJECT",
        payload: {
          message: success.data.success,
          statusCode: success.status,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.error,
          statusCode: error.response.status,
        },
      });
    });
};

export const filterProjects = (filter, value) => (dispatch, getState) => {
  api
    .post("/filterProjects", { filter, value })
    .then((success) => {
      dispatch({
        type: "FILTER_PROJECTS",
        payload: {
          items: success.data.success,
          statusCode: success.status,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.error,
          statusCode: error.response.status,
        },
      });
      dispatch({
        type: "ERROR_FILTER_PROJECTS",
        payload: {
          items: [],
        },
      });
    });
};

export const handleCreateProject = (action) => (dispatch, getState) => {
  dispatch({
    type: "HANDLE_CREATE_PROJECT",
    payload: action,
  });
};

export const closeCreateProject = (action) => (dispatch, getState) => {
  dispatch({
    type: "CLOSE_CREATE_PROJECT",
    payload: action,
  });
};

export const handleEditProject = (action, project) => (dispatch, getState) => {
  dispatch({
    type: "HANDLE_EDIT_PROJECT",
    payload: { action, project },
  });
};

export const stateReset = () => (dispatch, getState) => {
  dispatch({
    type: "STATE_RESET",
  });
};
