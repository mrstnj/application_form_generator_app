import React from 'react';
import './globals.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="error-container">
      <div className="error-heading">
        <h1 className="next-error-h1">404</h1>
        <h2>ご指定のページが見つかりませんでした。</h2>
      </div>
    </div>
  );
}

export default NotFoundPage;