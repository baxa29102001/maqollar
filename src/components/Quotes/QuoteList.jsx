import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuoteItem from "components/Quotes/QuoteItem";
import { fillAllQuotes } from "store/quote";
import { CSSTransition } from "react-transition-group";

const QuoteList = () => {
  const quote = useSelector((state) => state.quote);
  const dispatch = useDispatch();
  const loading = quote.loading;
  useEffect(() => {
    dispatch(fillAllQuotes());
  }, []);
  const whatEver = ["", "", "", "", ""];

  return (
    <div className="max-w-screen-lg mx-auto my-5">
      <CSSTransition in={loading} timeout={5000} classNames="my-node">
        <div>{loading && whatEver.map(() => <QuoteItem loading />)}</div>
      </CSSTransition>

      <CSSTransition in={!loading} timeout={500} classNames="quote_item">
        <div>
          {!loading &&
            quote.quotesList.length > 0 &&
            quote.quotesList.map((item) => (
              <QuoteItem
                key={item.id}
                title={item.text}
                author={item.author}
                id={item.id}
              />
            ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default QuoteList;
