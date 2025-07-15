import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import {endpoints} from '../../config/config';
import { getToken } from '@react-native-firebase/messaging';
import { getFCMToken } from '../../services/NotificationsService';

const initialState = {
  message: null,
  loading: false,
  token: null,
  userRole: 1,
  optCode: '',
  mobileNumber: '',
  isLogged:false,
  userId:'',
  userName:'',
  userPhone:'',
};

export const verifyMobile = createAsyncThunk(
  'verifyMobile',
  async ({mobileNumber}, {getState, rejectWithValue, fulfillWithValue}) => {
    const data = {
      mobile: mobileNumber,
    };
    // const response = await api.post(endpoints.VERIFY_MOBILE, data);
    const response={
     data:{ data:[{
      }],
      status:true
    
    }
    }
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);

export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    {enteredOtp},
    {getState, rejectWithValue, fulfillWithValue},
  ) => {
    const {mobileNumber} = getState().Auth
    const data = {
      mobile: mobileNumber,
      otp: enteredOtp,
    };
    const response = await api.post(endpoints.LOGIN, data);
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);



export const requestLoginOtp = createAsyncThunk(
  'requestLoginOtp',
  async (
    phone,
    { rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      number: phone,
    };
    const response = await api.post(endpoints.LOGIN, data);
    console.log(response,"+++++++++++RESPONSNSNSN")
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);



export const addAttendence = createAsyncThunk(
  'addAttendence',
  async (
    payload,
    { rejectWithValue, fulfillWithValue},
  ) => {
    const response = await api.post(endpoints.ADD_ATTENDENCE,payload);
    console.log(response,"+++++++ResponseAttendecde")
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);


export const pushFcmToken = createAsyncThunk(
  'pushFcmToken',
  async (
    _,
    {getState, rejectWithValue, fulfillWithValue},
  ) => {
    const {userId} = getState().Auth;
    const token = await getFCMToken();
    console.log(userId,"+++++++++++++AUTH USER")
    const payload={
        "rmb_user_id": userId,
        "player_id": token,
        "user_type": "0"
    }
    const response = await api.post(endpoints.POST_TOKEN,payload);
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);


export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
    actionLogout: state => {
      state.token = null;
      state.userId=null
    },
    actionLogin: state => {
      state.token = 'sample token';
    },
    setMobile:(state,action)=>{
      state.mobileNumber=action.payload
    },
    setInitial:state=>{
      state.loading=false,
      state.message=null
    },
    setUserId:(state,action)=>{
      state.userId=action.payload
    },
    setUserName:(state,action)=>{
      state.userName = action.payload
    },
     setUserPhone:(state,action)=>{
      state.userPhone = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = null;
      if(action.payload.token){
        state.token=action.payload.token;
        state.isLogged=true
      }
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });

    builder.addCase(verifyMobile.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(verifyMobile.fulfilled, (state, action) => {
      console.log(">>>>>>>>>>>>>>ACTION",action.payload)
      state.loading = false;
      state.message = null;
      console.log(">>>>>>>OTP",action.payload?.data[0]?.otp)
      if (action.payload?.data[0]?.mobile) {
        state.mobileNumber = action.payload?.data[0]?.mobile;
      }
    });
    builder.addCase(verifyMobile.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });

    builder.addCase(addAttendence.pending, (state) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(addAttendence.fulfilled, (state, action) => {
      state.loading = false;
      state.message = null;
      // You can add more specific state updates here if needed, e.g., attendance data
    });
    builder.addCase(addAttendence.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload || 'Failed to add attendance.';
    });
  },
});

export const {actionLogout, actionLogin, setMobile, setInitial , setUserId,setUserName,setUserPhone} = AuthSlice.actions;

export default AuthSlice.reducer;
