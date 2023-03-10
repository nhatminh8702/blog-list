import React, { useEffect, useCallback, useState, useMemo } from "react";
import store from "./Redux";
const API = "https://jsonplaceholder.typicode.com/posts";
const ipp = 5; //item per page
const bpp = 9; //button per page
function List() {
  const [searchState, setSearchState] = useState([]);
  //   const [list, setList] = useState([]);
  const [position, setPostion] = useState(1);
  const [nop, setNop] = useState(0); //number of page
  const [lastButton, setLastButton] = useState(position + bpp - 1);

  //use memo

  const blogDisplay = useMemo(() => {
    console.log("tinh toan lai blogDisplay", store.getState());
    return store.getState().blogList;
    //   .blogList.filter((blog) =>
    //     blog.title
    //       .toLowerCase()
    //       .includes(store.getState().blogHistory.searchText)
    //   )
    //   .slice(ipp * position - ipp, position * ipp);
  }, [
    store.getState().blogList.length,
    store.getState().blogHistory.searchText,
    position,
  ]);

  const postButtonPagination = useMemo(() => {
    return [];
    const tempNop =
      store
        .getState()
        .blogList.filter((blog) =>
          blog.title
            .toLowerCase()
            .includes(store.getState().blogHistory.searchText.toLowerCase())
        ).length / ipp;
    if (tempNop % 1 === 0) {
      setNop(tempNop);
    } else {
      setNop(tempNop - (tempNop % 1) + 1);
    }
    const buttonArr = [];
    if (position >= lastButton - 2) {
      if (lastButton >= nop - 2) {
        setLastButton(nop);
      } else {
        setLastButton((c) => (c += 3));
      }
    } else if (position <= lastButton - 6) {
      if (lastButton - 7 <= 4) {
        setLastButton(9);
      } else {
        setLastButton((c) => (c -= 3));
      }
    }
    if (nop < bpp) {
      for (let i = 1; i <= nop; i++) {
        buttonArr.push(i);
      }
    } else {
      for (let i = lastButton - bpp + 1; i <= lastButton; i++) {
        buttonArr.push(i);
      }
    }

    return buttonArr;
  }, [
    nop,
    store.getState().blogHistory.searchText,
    store.getState().blogList,
    position,
    lastButton,
  ]);
  //--
  //use callback
  //   const searchCallBack = useCallback(()=>{
  //     return
  //   },[])
  const handleSearch = useCallback((event) => {
    store.dispatch({ type: "SET_SEARCH_TEXT", payload: event.target.value });
    setPostion(1);
    // console.log('searchCallBack()',searchCallBack())
  }, []);
  const handleFetch = useCallback(async () => {
    const response = await fetch(API);
    if (response.ok) {
      const data = await response.json();
      console.log("call api success");
      return data;
    }
  }, [API]);

  const changePage = useCallback((inputPosition) => {
    setPostion(inputPosition);
  }, []);

  //   const search = useCallback((text) => {
  //     console.log("+++---->oooo=>", text);
  //     console.log(store.getState().blogList);

  //     const textSearch = new RegExp(text.toLowerCase());
  //     // setList(list.filter((item) => textSearch.test(item.title)));
  //   }, []);
  //   const listDisplay = useCallback(()=>{
  //     return store.getState().blogList.filter(blog=> blog.title.toLowerCase().includes(store.getState().blogHistory.searchText))
  //   },[store.getState().blogList,store.getState().blogHistory.searchText])
  //use effect
  useEffect(async () => {
    const data = await handleFetch();
    console.log("await handleFetch()", data);
    store.dispatch({ type: "SET_LIST", payload: data });
    setPostion(store.getState().blogHistory.buttonPosition);
    console.log("a");
  }, []);

  return (
    <div>
      <div className="list">
        <ul>
          <li>
            <div className="searchBar">
              <input
                type="text"
                placeholder="seach for title"
                value={store.getState().blogHistory.searchText}
                onChange={handleSearch}
              />
            </div>
          </li>
          {blogDisplay.map((item) => {
            return (
              <li key={item.id}>
                <div className="card">
                  <p className="title">
                    {item.id}-{item.title}
                  </p>
                  <p className="body">{item.body}</p>
                </div>
                <a href="/">see more...</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ul className="buttonList">
          <li>
            <button
              onClick={() => {
                if (position > bpp) setPostion((p) => p - bpp);
              }}
            >
              &#60;&#60;
            </button>
            <button
              onClick={() => {
                if (position > 1) setPostion((p) => p - 1);
              }}
            >
              &#60;
            </button>
          </li>
          {postButtonPagination.map((item) => {
            return (
              <li>
                <button
                  onClick={() => changePage(item)}
                  style={
                    item === position ? { backgroundColor: "#0d314b" } : {}
                  }
                >
                  {item}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => {
                if (position < nop) setPostion((p) => p + 1);
              }}
            >
              &#62;
            </button>
            <button
              onClick={() => {
                if (position < nop - bpp) setPostion((p) => p + bpp);
              }}
            >
              &#62;&#62;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default List;
