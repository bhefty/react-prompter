export let getUsers = () => {
  return {
    type: 'FETCH_USER',
    payload: {
      name: 'Bill',
      age: 27
    }
  }
}
