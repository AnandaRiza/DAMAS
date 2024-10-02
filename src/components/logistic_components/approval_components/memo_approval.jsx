import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemoApprovalForm = ({ memoId, approvalData }) => {
    const [approvalStatus, setApprovalStatus] = useState('');
    const [approvalUpload, setApprovalUpload] = useState(null);
    const [approvalNotes, setApprovalNotes] = useState('');

    useEffect(() => {
        if (approvalData) {
            setApprovalStatus(approvalData.approval_status);
            setApprovalNotes(approvalData.approval_notes);
        }
    }, [approvalData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('approval_status', approvalStatus);
        formData.append('approval_upload', approvalUpload);
        formData.append('approval_notes', approvalNotes);
        formData.append('memo_id', memoId);

        try {
            const response = await axios.post(`/api/memo-approval`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Memo approval submitted successfully');
        } catch (error) {
            console.error('There was an error submitting the memo approval!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="memo_id" value={memoId} />
            <div>
                <label>Approval Status:</label>
                <input
                    type="text"
                    value={approvalStatus}
                    onChange={(e) => setApprovalStatus(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Approval Upload:</label>
                <input
                    type="file"
                    onChange={(e) => setApprovalUpload(e.target.files[0])}
                    required
                />
            </div>
            <div>
                <label>Approval Notes:</label>
                <textarea
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MemoApprovalForm;
