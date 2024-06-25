import { useStateContext } from "@/context/ContextProvider";

export const IsOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_OPERATOR) {
        return true;
    }
    return false;
};

export const IsSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_SUPERVISOR) {
        return true;
    }
    return false;
};

export const IsDevSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_DEV_SUPERVISOR) {
        return true;
    }
    return false;
};

export const IsPpoSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_PPO_SUPERVISOR) {
        return true;
    }
    return false;
};

export const IsOperationSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_OPERATION_SUPERVISOR) {
        return true;
    }
    return false;
};

export const IsLogisticSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_LOGISTIC_SUPERVISOR) {
        return true;
    }
    return false;
};

export const IsReviewerSupervisor = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_REVIEWER_SUPERVISOR) {
        return true;
    }
    return false;
};

export const IsDevOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_DEV_OPERATOR) {
        return true;
    }
    return false;
};

export const IsPpoOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_PPO_OPERATOR) {
        return true;
    }
    return false;
};

export const IsSkseOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_SKSE_OPERATOR) {
        return true;
    }
    return false;
};

export const IsNetworkOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_NETWORK_OPERATOR) {
        return true;
    }
    return false;
};

export const IsServerOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_SERVER_OPERATOR) {
        return true;
    }
    return false;
};

export const IsDacenOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_DACEN_OPERATOR) {
        return true;
    }
    return false;
};

export const IsItsupportOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_ITSUPPORT_OPERATOR) {
        return true;
    }
    return false;
};

export const IsItmoOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_ITMO_OPERATOR) {
        return true;
    }
    return false;
};

export const IsItsecurityOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_ITSECURITY_OPERATOR) {
        return true;
    }
    return false;
};

export const IsLogisticOperator = () => {
    const { userAplikasi } = useStateContext();
    if (userAplikasi !==null && userAplikasi.groupakses !== null && userAplikasi.groupakses  === process.env.NEXT_PUBLIC_USER_LOGISTIC_OPERATOR) {
        return true;
    }
    return false;
};

