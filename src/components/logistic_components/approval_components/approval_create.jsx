import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const LogisticTable = ({ headers, data, action, link, onSort, sortConfig }) => {
    const router = useRouter();

    const getDisplayName = (header) => {
        const displayNames = {
            memo_id: 'Memo ID',
            memo_num: 'Nomor Memo',
            memo_perihal: 'Perihal Memo',
            memo_pic: 'PIC',
            memo_status: 'Status Memo',
            memo_deadline: 'Deadline'
        };
        return displayNames[header] || header;
    };

    const handleEditClick = (memoId) => {
        router.push(`${link}/approvememo/${memoId}`);
    };

    const handleApprovalClick = (memoId) => {
        router.push(`${link}/approvememo/${memoId}`);
    };

    const handleCreateNewClick = () => {
        router.push(`${link}/approvememo/new`);
    };

    return (
        <div className="overflow-x-auto">
            <button onClick={handleCreateNewClick}>Create New Memo Approval</button>
            <table className="table">
                <thead>
                    <tr className="border-b-2 bg-[#00A6B4]/[0.5] text-sm">
                        {headers.map((item, index) => (
                            <th
                                key={index}
                                className={`py-3 px-6 uppercase ${item === 'memo_id' ? 'hidden' : ''}`}
                                onClick={() => onSort(item)}
                            >
                                <div className="flex items-center cursor-pointer">
                                    {getDisplayName(item)}
                                    {sortConfig.key === item && (
                                        sortConfig.direction === 'ascending' ? (
                                            <MdArrowDropUp className="ml-1" />
                                        ) : (
                                            <MdArrowDropDown className="ml-1" />
                                        )
                                    )}
                                </div>
                            </th>
                        ))}
                        {action && (
                            <th className="py-3 px-6 w-32 flex items-center justify-center gap-3 uppercase">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0
                                    ? "bg-white"
                                    : "bg-[#00A6B4]/[0.5]"
                            } hover:bg-gray-100 text-xs leading-5`}
                        >
                            {headers.map((header, headerIndex) => (
                                <td
                                    key={headerIndex}
                                    className={`py-3 px-6 ${header === 'memo_id' ? 'hidden' : ''}`}
                                >
                                    {item[header]}
                                </td>
                            ))}

                            {action && (
                                <td className="py-3 px-6 w-32 flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        className="text-blue-600 flex flex-col gap-1 items-center justify-center pt-2"
                                        onClick={() => handleApprovalClick(item.memo_id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        type="button"
                                        className="text-orange-600 flex flex-col gap-1 items-center justify-center pt-2"
                                        onClick={() => handleEditClick(item.memo_id)}
                                    >
                                        <AiOutlineEdit size={20} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogisticTable;