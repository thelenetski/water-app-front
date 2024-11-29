export const selectIsSignedIn = (state) => state.auth.isSignedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectAuthLoading = (state) => state.auth.loading;
