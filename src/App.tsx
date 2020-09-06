import React, { useState, useReducer, useEffect } from "react";
import "./styles.css";
import axios from "axios";

const initialState = {
  posts: [],
  err: "",
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Success":
      return {
        posts: action.payload,
        err: "",
        loading: true
      };
    case "Error":
      return {
        posts: [],
        err: "Something went wrong there...",
        loading: false
      };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getAllPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        dispatch({ type: "Success", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "Error" });
      });
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="App">
      {state.loading ? (
        state.posts.map((el, index) => <div key={el.id}>{el.title}</div>)
      ) : (
        <div>{state.err}</div>
      )}
    </div>
  );
}
