import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface initialState{
  data:{
    _id:string,
    name:string,
    email:string,
    role:string
  },
    token:string
}

const initialState:initialState= {
   data:{ 
    _id:"",
    name:"",
    email:"",
    role:"",
   },
    token:"",

  }

const counterSlice = createSlice({
  name: 'center',
  initialState,
  reducers: {
   
    setUser:(state,action:PayloadAction<initialState>)=>{
      state.data=action.payload.data,
     
       state.token=action.payload.token
      if(typeof window !="undefined"){
           localStorage.setItem("user",JSON.stringify({
            isLoggedIn:true,
            _id:state.data._id,
            name:state.data.name,
            email: state.data.email,
            token: state.token,
            role: state.data.role
           }))
      }
    },
    removeUser:(state)=>{
      state.data._id="",
        state.data.name="",
      state.data.email = "",
       state.token="",
       state.data.role=""
       if(typeof window !="undefined"){
        localStorage.removeItem("user")
       window.location.reload()
       }
    }
  }
})

export const { setUser, removeUser } = counterSlice.actions
export default counterSlice.reducer