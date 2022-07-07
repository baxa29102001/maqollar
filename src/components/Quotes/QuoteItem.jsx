import React from "react";
import { Link } from "react-router-dom";

const QuoteItem = (props) => {
  const loading = props.loading;
  return (
    <div
      className={`${
        loading ? "bg-white" : "bg-[#c2e7f0]"
      }   p-3 mb-5 bg-main rounded shadow-card flex  items-center justify-between`}
    >
      <div>
        <div
          className={loading ? "bg-slate-200 animate-pulse w-48 mb-3 h-3" : ""}
        >
          <h2 className="text-2xl ">{props.title}</h2>
        </div>
        <div className={loading ? "bg-slate-200 animate-pulse w-36 h-3" : ""}>
          <h3 className="text-lg italic font-bold">{props.author}</h3>
        </div>
      </div>
      <div
        className={
          loading ? "bg-slate-200 animate-pulse w-32 h-11" : "flex-shrink-0"
        }
      >
        <Link className={loading ? "" : "main_btn "} to={`/quotes/${props.id}`}>
          {loading ? "" : "To'liq ko'rish"}
        </Link>
      </div>
    </div>
  );
};

export default QuoteItem;
