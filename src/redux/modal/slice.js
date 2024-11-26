import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deleteWater, addWater, patchWater } from "../waters/operations";
import { patchUser } from "../user/operations";
import { logOut } from "../auth/operations";

export const modalTypes = {
  editUser: "edit-user",
  confirmLogOutUser: "confirm-logout-user",
  editWater: "edit-water",
  addWater: "add-water",
  confirmDelete: "confirm-delete",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    type: null,
    content: null,
  },
  reducers: {
    openEditUser(state, action) {
      state.isOpen = true;
      state.type = modalTypes.editUser;
      state.content = action.payload;
    },
    openConfirmLogOutUser(state, action) {
      state.isOpen = true;
      state.type = modalTypes.confirmLogOutUser;
      state.content = action.payload;
    },
    openEditWater(state, action) {
      state.isOpen = true;
      state.type = modalTypes.editWater;
      state.content = action.payload;
    },
    openAddWater(state, action) {
      state.isOpen = true;
      state.type = modalTypes.addWater;
      state.content = action.payload;
    },
    openConfirmDelete(state, action) {
      state.isOpen = true;
      state.type = modalTypes.confirmDelete;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
    userModal(state) {
      state.isUserLogoModalOpen = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        deleteWater.fulfilled,
        addWater.fulfilled,
        patchWater.fulfilled,
        patchUser.fulfilled,
        logOut.fulfilled
      ),
      (state) => {
        state.isOpen = false;
        state.type = null;
        state.content = null;
      }
    );
  },
});

// Експортуємо генератори екшенів та редюсер
export const {
  openEditUser,
  openConfirmLogOutUser,
  openEditWater,
  openAddWater,
  openConfirmDelete,
  closeModal,
  userModal,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
