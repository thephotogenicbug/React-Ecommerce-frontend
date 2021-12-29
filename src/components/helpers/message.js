import React from 'react'

export const ShowErrMsg = (msg) => (
  <div>
    <div className="alert alert-danger" role="alert">
      {msg}
    </div>
  </div>
);
export const ShowSuccessMsg = (msg) => (
  <div>
    <div className="alert alert-success" role="alert">
      {msg}
    </div>
  </div>
);