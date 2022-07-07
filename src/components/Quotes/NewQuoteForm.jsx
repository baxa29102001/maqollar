import React, { useState, useEffect } from "react";
import { sendQuoteThunk, quotesAction } from "store/quote";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingButton from "components/UI/LoadingButton";

function NewQuoteForm() {
  const [form, setForm] = useState({
    author: "",
    text: "",
  });
  const [formError, setErrorForm] = useState({
    error_name: "",
  });

  const notifaction = useSelector((state) => state.quote.notifaction);
  const dispatch = useDispatch();
  const history = useHistory();

  const formHandler = (e) => {
    setErrorForm({
      error_name: "",
    });
    setForm((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };
  const { status, error } = notifaction;

  useEffect(() => {
    if (status === "success") {
      history.push("/quotes");
      dispatch(quotesAction.resetNotifaction());
    }

    if (status === "error") {
      setErrorForm({
        error_name: error,
      });
    }
  }, [status, history, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const { author, text } = form;
    if (!author.trim() || !text.trim()) {
      setErrorForm({
        error_name: "Iltimos ma'lumotlarni kirting!",
      });
      return;
    }

    dispatch(sendQuoteThunk(form));
  };

  return (
    <div>
      <form
        className="w-full bg-white rounded p-3 shadow-card"
        onSubmit={submitHandler}
      >
        {formError.error_name && (
          <p className="bg-red-400 p-2 text-white rounded mb-2">
            {formError.error_name}
          </p>
        )}
        <div className="mb-3">
          <label htmlFor="author" className="font-bold text-lg block mb-2 ">
            Muallif
          </label>
          <div>
            <input
              className="w-full bg-c_gray outline-none p-2 border border-[#c1d1d1] rounded "
              id="author"
              type="text"
              name="author"
              value={form.author}
              onChange={formHandler}
            />
          </div>
        </div>
        <div>
          <label htmlFor="text" className="font-bold  text-lg block mb-2">
            Qisqacha mazmuni
          </label>
          <div>
            <textarea
              id="text"
              className="w-full bg-c_gray outline-none p-2 border border-[#c1d1d1] rounded resize-none"
              type="text"
              rows="10"
              name="text"
              value={form.text}
              onChange={formHandler}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <LoadingButton status={status} text="Quote qo'shish" />
        </div>
      </form>
    </div>
  );
}

export default NewQuoteForm;
