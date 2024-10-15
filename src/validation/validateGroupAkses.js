import { useStateContext } from "@/context/ContextProvider";

// const checkUserAccess = (expectedGroup, userId) => {
//     const { userAplikasi } = useStateContext();
    
//     if (userAplikasi && userAplikasi.groupakses?.toUpperCase() === expectedGroup) {
//         return userAplikasi.userid === userId;
//     }
    
//     return true;
// };

// export const IsOperatorDev = () => checkUserAccess(process.env.NEXT_PUBLIC_USER_OPERATOR, 'DAMASOPR');
// // export const IsOperatorOps = () => checkUserAccess(process.env.NEXT_PUBLIC_USER_OPERATOR, 'DAMASOPS');
// // export const IsOperatorMemo = () => checkUserAccess(process.env.NEXT_PUBLIC_USER_OPERATOR, 'ACSYSOPT2');

// export const IsSupervisor = () => {
//     const { userAplikasi } = useStateContext();
//     return true
// };

// export const IsDevSupervisor = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_DEV_SUPERVISOR;
// };

// export const IsPpoSupervisor = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_PPO_SUPERVISOR;
// };

// export const IsOperationSupervisor = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_OPERATION_SUPERVISOR;
// };

// export const IsLogisticSupervisor = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_LOGISTIC_SUPERVISOR;
// };

// export const IsReviewerSupervisor = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_REVIEWER_SUPERVISOR;
// };

// export const IsDevOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_DEV_OPERATOR;
// };

// export const IsPpoOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_PPO_OPERATOR;
// };

// export const IsSkseOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SKSE_OPERATOR;
// };

// export const IsNetworkOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_NETWORK_OPERATOR;
// };

// export const IsServerOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_SERVER_OPERATOR;
// };

// export const IsDacenOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_DACEN_OPERATOR;
// };

// export const IsItsupportOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_ITSUPPORT_OPERATOR;
// };

// export const IsItmoOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_ITMO_OPERATOR;
// };

// export const IsItsecurityOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_ITSECURITY_OPERATOR;
// };

// export const IsLogisticOperator = () => {
//     const { userAplikasi } = useStateContext();
//     return userAplikasi && userAplikasi.groupakses === process.env.NEXT_PUBLIC_USER_LOGISTIC_OPERATOR;
// };
