import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../../services";
 const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false);
  const [localstorage, useLocalstorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const storeDataRef = useRef();

  const handleCommentSubmition = (e) => {
    setError(false);
    const { value: comment } = commentRef.current;
    const { value: name } = nameRef.current;
    const { value: email } = emailRef.current;
    const {checked: storeData} = storeDataRef.current;

    if (!comment || !name || !email) {
      console.log(comment,name,email,storeData)
      setError(true);
      return
    }
    const commentObj = {name, email,comment, slug}
    if(storeData){
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    }
    else{
      window.localStorage.removeItem("name");
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then(res=>{
        setShowSuccessMessage(true);
        setTimeout(()=>{setShowSuccessMessage(false)}, 2000)
      })
  }

    return (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comments</h3>
        <div className="grid grid-cols-1 gap-4 pb-4">
          <textarea
            ref={commentRef}
            className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="Comments"
            name="comment"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
          <input
            type="text"
            ref={nameRef}
            className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="Name"
            name="name"
          />
          <input
            type="email"
            ref={emailRef}
            className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder="Example@gmail.com"
            name="email"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 pb-4">
          <div>
            <input
              type="checkbox"
              id="storageData"
              name="storedata"
              value="true"
              ref={storeDataRef}
            />
            <label htmlFor="storageData" className="text-gray-500 cursor-pointer ml-2">
              Save my Name , Email, in this browser for the next time I comment
            </label>
          </div>
          {
            error && <p className="text-xs text-red-500">All Fields Are required!</p>
          }
          <div className="mt-8">
            <button
              type="button"
              className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-400 px-8 py-4 font-semibold rounded-full text-white cursor-pointer "
              onClick={handleCommentSubmition}
            >
              Post Comment
            </button>
            {
              showSuccessMessage && <span className="font-semibold mt-2 text-green-500 text-xl float-right">Comment submited for review</span>
            }
          </div>
        </div>
      </div>
    );
  };

  export default CommentsForm
