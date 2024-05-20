import React from 'react';

const LogisticBreadcrumbs = () => {
    return (
        <div>
            <span className="flex text-[#0066AE] ml-10 mt-2">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Documents</a>
                        </li>
                        <li>Edit Memo</li>
                    </ul>
                </div>
            </span>
        </div>
    );
};

export default LogisticBreadcrumbs;
