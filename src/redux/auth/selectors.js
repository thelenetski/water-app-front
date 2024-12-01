export const selectIsSignedIn = (state) => state.auth.isSignedIn;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectAuthLoading = (state) => state.auth.loading;

export const selectAuthToken = (state) => state.auth.token;
