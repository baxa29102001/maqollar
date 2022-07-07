import React from "react";
import NewQuoteForm from "components/Quotes/NewQuoteForm";

function NewQuote() {
  return (
    <div className="grid grid-cols-12 mt-5">
      <div className="col-span-3"></div>
      <div className="col-span-6">
        <NewQuoteForm />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
}

export default NewQuote;
