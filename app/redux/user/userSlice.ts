import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UserState {
  user: any | null
  isAuthenticated: boolean
  users: any[]
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  users: []
}

export const emitSecretPhraseUpdate = createAsyncThunk(
  'user/updateSecretPhrase',
  async ({ userId, newSecretPhrase, socket, actorId }: { userId: string, newSecretPhrase: string, socket: any, actorId: string }) => {
    socket.emit('update-secret-phrase', {
      userId,
      newSecretPhrase,
      actorId
    })
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    updateUserSecretPhrase: (state, action) => {
      const { userId, newSecretPhrase } = action.payload
      if (state.users) {
        state.users = state.users.map(user => 
          user.username === userId 
            ? { ...user, secret_phrase: newSecretPhrase }
            : user
        )
      }
    }
  }
})

export const { setUser, clearUser, updateUserSecretPhrase } = userSlice.actions
export const userReducer = userSlice.reducer
