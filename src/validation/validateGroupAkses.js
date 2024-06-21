import { useStateContext } from "@/contexts/ContexProvider";

export const IsOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_OPERATOR) {
        return true;
    }
    return false;
};

export const IsSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isDevSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_OPERATOR) {
        return true;
    }
    return false;
};

export const isPpoSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isOperationSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isLogisticSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isReviewerSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isDevOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isPpoOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isSkseOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isDacenOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isItsupportOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isItmoOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isItsecurityOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

export const isLogisticOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SA_SUPERVISOR) {
        return true;
    }
    return false;
};

