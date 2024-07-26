"use client";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { api } from 'utils/api';

export interface IAuth {
    userInfo: {
        token: string | null;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            mobile_no: string;
            role_id: number;
            status: string;
            user_uuid: string;
        };
    };
    isLogin: boolean;
    login: (
        email: string,
        password: string,
        onSuccess: () => void,
        onError: (message: string) => void
    ) => void;
    logout: () => void;
}

export const INITIAL_AUTH_STATE = {
    token: "",
    user: {
        email: "",
        first_name: "",
        last_name: "",
        mobile_no: "",
        role_id: -1,
        status: "ACTIVE",
        user_uuid: "",
    },
};

export const AuthContext = createContext<IAuth>({
    userInfo: INITIAL_AUTH_STATE,
    isLogin: false,
    login: () => { },
    logout: () => { },
});


export const isValidToken = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (e) {
        return false
    }
}


export const AuthProvider: React.FC<{ children: React.ReactNode }> = (
    props
) => {
    const [userInfo, setUserInfo] = useState<IAuth["userInfo"]>(INITIAL_AUTH_STATE);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const data = JSON.parse(auth);
            const date1 = new Date(data.date);
            const date2 = new Date();
            const diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60);
            if (diff <= 1) {
                setUserInfo(data);
                // Set the token in API headers
                api.defaults.headers.common["auth-Token"] = `${data.token}`;
            }
        }
        setLoading(false);
    }, []);

    React.useEffect(() => {
        if (userInfo.token && isValidToken(userInfo.token)) {
            Cookies.set("token", userInfo.token);
        } else {
            Cookies.remove("token");
        }
    }, [userInfo])

    const handleLogin = async (
        email: string,
        password: string,
        onSuccess: () => void,
        onError: (message: string) => void
    ) => {
        try {
            const res = await api.post("/authentication/login", {
                email: email,
                password: password,
            });

            const userData: IAuth["userInfo"] = {
                token: res.data.data.token,
                user: {
                    email: res.data.data.user.email,
                    first_name: res.data.data.user.first_name,
                    last_name: res.data.data.user.last_name || "",
                    mobile_no: res.data.data.user.mobile || "",
                    role_id: res.data.data.user.role_uuid, // Adjust according to your actual role_id field
                    status: res.data.data.user.status,
                    user_uuid: res.data.data.user.user_uuid,
                },
            };

            localStorage.setItem(
                "auth",
                JSON.stringify({ ...userData, date: new Date() })
            );

            Cookies.set("token", userData.token);

            setUserInfo(userData);

            // // Set the token in API headers
            // api.defaults.headers.common["auth-Token"] = `${userData.token}`;

            onSuccess();

            router.push("/");
        } catch (error: any) {
            console.error("Login error:", error);
            onError(error.response.data.message);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUserInfo(INITIAL_AUTH_STATE);
        delete api.defaults.headers.common["Authorization"];
        Cookies.remove("token");
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                isLogin: !!userInfo.token,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
