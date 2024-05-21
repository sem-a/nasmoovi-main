import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentQuery } from "../../app/services/auth";
import { PATHS } from "../../paths";
import LoadingScreen from "../loading";


type Props = {
    children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const location = useLocation();

    const { data: user, isLoading } = useCurrentQuery();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!user) {
        return <Navigate to={PATHS.login} />;
    }

    return children;
};

export default ProtectedRoute;
