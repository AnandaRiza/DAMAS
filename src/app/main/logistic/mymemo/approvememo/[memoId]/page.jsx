import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemoList from './MemoList';
import MemoApprovalForm from '@/components/logistic_components/approval_components/memo_approval';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/memos" element={<MemoList />} />
                <Route path="/memo-approval/:memoId" element={<MemoApprovalForm />} />
            </Routes>
        </Router>
    );
};

export default App;
