import { useCurrentQuery } from "../../app/services/auth";
import LoadingScreen from "../../components/loading";

export const Auth = ({ children }: { children: JSX.Element }) => {
    const { isLoading } = useCurrentQuery();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return children;
};
