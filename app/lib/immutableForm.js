export function getFormState(state, reduxMountPoint) {
  console.log(state, reduxMountPoint);
  return state.get(reduxMountPoint).toJS();
}
