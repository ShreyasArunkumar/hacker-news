import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./index.scss";
import { getHostName } from "../utils";
import UpArrow from "../Icons/UpArrow";

interface INews {
  data: any;
  page: number;
  onClickNext: () => void;
  onClickPrev: () => void;
  incrementVote: (index: number) => void;
  hideNews: (index: number) => void;
}

export default function Table({
  data,
  onClickNext,
  onClickPrev,
  incrementVote,
  page,
  hideNews,
}: INews) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>Up Votes</th>
            <th className="wd100" style={{ width: "100%" }}>
              News Details
            </th>
          </tr>
        </thead>

        <tbody>
          {!!data &&
            data.map((n: any, index: number) => (
              <tr key={n.points}>
                <td>{n.num_comments}</td>
                <td>{n.points}</td>
                <td
                  onClick={() => incrementVote(index)}
                  className="pointer text-center rotate90deg"
                >
                  <UpArrow />
                </td>
                <td>
                  <a href={n.url} target="_blank" rel="noopener noreferrer">
                    {n.title}
                  </a>

                  <span className="news_feed__info">
                    <span className="news_feed__info_gray">
                      {` (${getHostName(n.url)}) by `}
                    </span>

                    <span className="capitalize">{`${n.author} `}</span>

                    <span className="news_feed__info_gray">
                      {formatDistanceToNow(new Date(n.created_at), {
                        addSuffix: false,
                      })}
                    </span>

                    <span className="pointer" onClick={() => hideNews(index)}>
                      {" "}
                      [ hide ]
                    </span>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex mt-16 justify-end">
        {page !== 0 && (
          <>
            <div
              onClick={onClickPrev}
              className="primary bold heading-3 pointer"
            >
              Previous
            </div>
            <div
              className="primary bold heading-3 pointer"
              style={{ margin: "auto 10px" }}
            >
              |
            </div>
          </>
        )}
        <div onClick={onClickNext} className="primary bold heading-3 pointer">
          Next
        </div>
      </div>
    </>
  );
}
