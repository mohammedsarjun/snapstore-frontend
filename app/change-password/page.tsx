import { ReactElement } from "react";
import ChangePassword from "@/features/auth/changePassword/components/ChangePassword";

interface ChangePasswordPageProps {
    searchParams: Promise<{ token?: string }>;
}

const ChangePasswordPage = async ({ searchParams }: ChangePasswordPageProps): Promise<ReactElement> => {
    const params = await searchParams;
    const token = params.token || "";

    return (
        <>
            <ChangePassword token={token} />
        </>
    );
};

export default ChangePasswordPage;
