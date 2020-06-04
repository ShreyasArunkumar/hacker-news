/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Button from "./FormComponents/Button";
import Input from "./FormComponents/Input";
import NewsTable from "./Table";
import { checkInLocalStorage, setInLocalStorage } from "./utils";

interface INews {}

export default function index() {
  const [news, setNews] = useState<any>([]);
  const [searchString, setSearchString] = useState("react");
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  async function getNews() {
    try {
      let res: any = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${searchString}&page=${page}`
      );
      res = await res.json();
      setInLocalStorage(searchString + page, JSON.stringify(res.hits));
      setNews(res.hits);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function checkNews() {
    // setLoading(true);
    const res = checkInLocalStorage(searchString + page);
    if (res === null) {
      getNews();
    } else {
      setNews(JSON.parse(res));
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    checkNews();
  }, [searchString, page]);

  function onSubmit(e: any) {
    e.preventDefault();
    setPage(0);
    setSearchString(e.target.search.value);
  }

  function onClickPrev() {
    setPage(page - 1);
  }

  function onClickNext() {
    setPage(page + 1);
  }

  function incrementVote(id: number) {
    const newData = news;
    newData[id].points = news[id].points + 1;
    setInLocalStorage(searchString + page, JSON.stringify(newData));
    checkNews();
  }

  function hideNews(id: number) {
    const newData = news;
    newData.splice(id, 1);
    setInLocalStorage(searchString + page, JSON.stringify(newData));
    checkNews();
  }

  return (
    <div className="table_container">
      <div className="text-center heading-1 primary bold mt-16 mb-16">
        Hacker News
      </div>

      <form onSubmit={onSubmit} className="text-right mb-16">
        <Input name="search" defaultValue={searchString} className="mr-16" />
        <Button type="submit">Search</Button>
      </form>

      <NewsTable
        data={news}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        incrementVote={incrementVote}
        hideNews={hideNews}
        page={page}
      />
    </div>
  );
}
