export function personsFetchDataSuccess(data) {
  return {type: 'PERSONS_FETCH_DATA_SUCCESS', data: data.users};
}

export function personsFetchData(url) {
  return (dispatch) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(personsFetchDataSuccess(data)));
  };
}
