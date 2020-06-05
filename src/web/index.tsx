/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Button from "./FormComponents/Button";
import Input from "./FormComponents/Input";
import NewsTable from "./Table";
import { checkInLocalStorage, setInLocalStorage } from "./utils";
import Chart from "react-apexcharts";

export interface ChartOption {
  chart?: object;
  stroke?: object;
  grid?: object;
  dataLabels?: object;
  theme?: object;
  fill?: object;
  tooltip?: object;
  labels?: object;
  legend?: object;
  toolbar?: object;
  markers?: object;
  xaxis?: object;
  yaxis?: object;
  title?: object;
  colors?: object;
  plotOptions?: object;
}

export interface ChartData {
  name?: string;
  data: any;
}

export default function index() {
  const op: ChartOption = {};
  const se: ChartData[] = [];

  const [news, setNews] = useState<any>([]);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  const [options, updateOptions] = useState(op);
  const [series, updateSeries] = useState(se);

  async function getNews() {
    try {
      if (searchString !== "") {
        let res: any = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${searchString}&page=${page}`
        );
        res = await res.json();
        setInLocalStorage(searchString + page, JSON.stringify(res.hits));
        setNews(res.hits);
        updateCharts(res.hits);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function updateCharts(response: []) {
    let data: Array<number> = [];
    let categories: Array<string> = [];

    response.forEach((a: { points: number; author: string }) => {
      data.push(a.points);
      categories.push(a.author);
    });

    updateOptions({
      chart: {
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      grid: {
        show: true,
      },
      stroke: {
        width: 3,
        curve: "straight",
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#f06506",
        },
      },
      yaxis: {
        labels: {
          formatter: (a: number) => a,
        },
        title: {
          text: "Votes",
        },
      },
      xaxis: {
        categories,
        labels: {
          show: true,
        },
        title: {
          text: "Authors",
        },
      },
    });

    updateSeries([
      {
        name: "Votes",
        data,
      },
    ]);
  }

  function checkNews() {
    let res = checkInLocalStorage(searchString + page);
    if (res === null) {
      getNews();
    } else {
      res = JSON.parse(res);
      setNews(res);
      updateCharts(res);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    checkNews();
  }, [searchString, page]);

  function onSubmit(e: any) {
    e.preventDefault();
    const value = e.target.search.value;
    window.location.href = `/?search=${value}&page=${0}`;
    setPage(0);
    setSearchString(value);
  }

  useEffect(() => {
    const queryStrings = window.location.search;
    const urlParams = new URLSearchParams(queryStrings);
    const search: string | null = urlParams.get("search");
    const page: string | null = urlParams.get("page");

    if (search) {
      setSearchString(search);
    } else {
      setSearchString("css");
    }

    if (page !== null) {
      setPage(parseInt(page));
    }

    console.log(search, page);
  }, []);

  function onClickPrev() {
    window.location.href = `/?search=${searchString}&page=${page - 1}`;
  }

  function onClickNext() {
    window.location.href = `/?search=${searchString}&page=${page + 1}`;
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

      <Chart
        options={options}
        series={series}
        type="line"
        width={"100%"}
        height={"300px"}
      />
    </div>
  );
}
