import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'

const modal = document.getElementById('modal-root');

export const Modal= ({modalClose,children}) => {

  useEffect(()=>{
    document.addEventListener('keydown',keyModalClose);
    return(()=>{
      document.removeEventListener('keydown',keyModalClose)
    })
  })

 const keyModalClose = (event) => {
    if(event.target === event.currentTarget){
      modalClose()
    }

    if(event.code === 'Escape'){
      modalClose();
    }
  }

    return createPortal(
      <div className={css.Overlay}  onClick={keyModalClose}>
        <div className={css.Modal}>
          {children}
        </div>
      </div>,
      modal
    )
};

