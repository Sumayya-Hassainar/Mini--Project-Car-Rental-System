// redux/issueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
  name: "issues",
  initialState: [],
  reducers: {
    addIssue: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload,
        status: "Pending",
      })
    },
    updateIssueStatus: (state, action) => {
      const { id, status } = action.payload
      const issue = state.find((i) => i.id === id)
      if (issue) issue.status = status
    },
  },
})

export const { addIssue, updateIssueStatus } = issueSlice.actions
export default issueSlice.reducer
