import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fillSingleQuote } from "store/quote";
import { CSSTransition } from "react-transition-group";
function SingleQuote() {
  const { value, loading } = useSelector((state) => state.quote.singleQuote);

  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  useEffect(() => {
    dispatch(fillSingleQuote(id));
  }, [id, dispatch]);

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <CSSTransition in={loading} timeout={100} classNames="page">
          <div className="col-span-8">
            <figure className="bg-[#162b2b] rounded text-white p-12 mx-auto my-12">
              {loading && (
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="96"
                    height="96"
                    className="animate-spin"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
                      fill="rgba(161,224,224,1)"
                    />
                  </svg>
                </div>
              )}
              <p className="text-4xl">{value.text}</p>
              <figcaption className="text-right text-2xl text-[#a1e0e0] mt-2">
                {value.author}
              </figcaption>
            </figure>
          </div>
        </CSSTransition>

        <div className="col-span-2"></div>
      </div>
    </div>
  );
}

export default SingleQuote;
