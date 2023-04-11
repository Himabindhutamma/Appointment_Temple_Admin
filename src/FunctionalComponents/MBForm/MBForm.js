import React, { useState } from 'react';

const MBForm = ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };
  return <form onSubmit={(e)=>{handleSubmit(e)}}>{children}</form>;
};
export default MBForm;
