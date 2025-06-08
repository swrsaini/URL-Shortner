
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async({context})=>{
    try{
        const store = context.store;
        const queryClient = context.queryClient;
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser,
            });
            if(!user) return false;
            store.dispatch(login(user));
            const {isAuthenticated} = store.getState().auth;
            if(!isAuthenticated) return false;
            return true;
    } catch(e){
        throw redirect({to:'/auth'});
    }
    
}