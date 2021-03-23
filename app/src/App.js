import React, { useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import Modal from "./components/Modal";

const SHORT_URL_PREFIX = "https://rethink/";

const App = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [hasShortUrl, setHasShortUrl] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleLongUrlChange = (e) => {
    setLongUrl(e.target.value);
    if (hasShortUrl) setShortUrl(false);
  };

  const handleGetShortUrl = () => {
    axios
      .get(`/api/short-url?longUrl=${longUrl}`)
      .then((response) => {
        setShortUrl(SHORT_URL_PREFIX + response.data);
        setHasShortUrl(true);
      });
  };

  const handleShortenAnotherUrl = () => {
    setLongUrl("");
    setHasShortUrl(false);
  };

  const handleDeleteUrls = () => {
    axios.delete(`/api/urls`).then(() => {
      setUrls([]);
      setLongUrl("");
      setHasShortUrl(false);
      setShowModal(false);
    });
  };

  const handleShowUrls = () => {
    axios.get(`/api/urls`).then((response) => {
      setUrls(response.data);
      setShowModal(true);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form
        longUrl={longUrl}
        shortUrl={shortUrl}
        hasShortUrl={hasShortUrl}
        onLongUrlChange={handleLongUrlChange}
        onShowUrls={handleShowUrls}
        onShortenAnotherUrl={handleShortenAnotherUrl}
        onGetShortUrl={handleGetShortUrl}
      />
      <Modal
        showModal={showModal}
        urls={urls}
        shortUrlPrefix={SHORT_URL_PREFIX}
        onDeleteUrls={handleDeleteUrls}
        onCloseModal={handleCloseModal}
      />
    </>
  );
};

export default App;
