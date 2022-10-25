import React, { useState,useEffect } from 'react';
import {SearchBar} from './SearchBar/SearchBar'
import {Modal} from './Modal/Modal'
import {ImageGallery} from './ImageGallery/ImageGallery'
import fetchImgsData from '../servises/photoService'
import css from './App.module.css'
import {Button} from './Button/Button';
import {Loader} from './Loader/Loader';

export const App  = () => {
  const [input,setInput] = useState('')
  const [page,setPage] = useState(1)
  const [images,setImages] = useState([])
  const [modalContent,setModalContent] = useState({})
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)


  async function fetchImages()  {
    setLoading(true)

    try{
      const data = await fetchImgsData(input,page);
      setImages(images  => {
        return  [...images, ...data.hits]
      })
    }catch (error) {
      setError(error);
    } finally {
      setLoading( false );
    }
  }

  useEffect(()=>{
    (async () => {
      if(!input){
        return;
      }
      await fetchImages()
    })()
    // eslint-disable-next-line
  },[page,input])


  const handleOnSubmit = (inputValue) =>{
    if(input !== inputValue){
      setInput(inputValue)
      setImages([])
      setPage(1)
    }
  }

  const modalOpen = (largeImage,alt) =>{
    setIsModalOpen(true)
    setModalContent({largeImage,alt})
  }

  const modalClose = () =>{
    setIsModalOpen(false)
  }

  const addPictures = () =>{
    setPage(page + 1 )
  }
    return (
      <>
        <div className={css.App}>
          {isModalOpen && <Modal modalClose={modalClose}>
              <img src={modalContent.largeImage} alt={modalContent.alt} />
          </Modal>}
          <SearchBar onSubmit={handleOnSubmit} />
          <ImageGallery images={images} modalOpen={modalOpen}/>
          {loading && <Loader/>}
        </div>
        {error && <p className={css.error}>Something went wrong: try again...</p>}
        {images.length > 0 && <Button addPictures={addPictures}/>}
      </>
    );
};


