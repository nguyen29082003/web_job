import { configureStore } from '@reduxjs/toolkit';
import tagReducer from "../features/admin/Slice/tagSlice"
import newReducer from "../features/admin/Slice/newSlice"
import workReducer from "../features/admin/Slice/workSlice"
import companyReducer from "../features/admin/Slice/companySlice"
import checkCompanyReducer from "../features/admin/Slice/checkCompanySlice"
import typeWorkReducer from "../features/admin/Slice/typeWorkSlice"
import userReducer from "../features/admin/Slice/userSlice"
import formCVReducer from "../features/admin/Slice/formCVSlice"
import contactReducer from "../features/admin/Slice/contactSlice"
import socialNetworkReducer from "../features/admin/Slice/socialNetworkSlice"
const rootReducer = {
  tags: tagReducer,
  news: newReducer,
  works: workReducer,
  companys: companyReducer,
  checkCompanys: checkCompanyReducer,
  users: userReducer,
  typeWorks: typeWorkReducer,
  formCVs: formCVReducer,
  contacts: contactReducer,
  socialNetworks: socialNetworkReducer,
}
export default configureStore({
  reducer: rootReducer
});
