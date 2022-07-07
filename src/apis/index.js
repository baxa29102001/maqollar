import axios from "axios";
const MAIN_KEY = "AIzaSyAdVhTHNTSDa3wkWZaEGyfE3R2cYt-WwpU";
export const SIGN_UP =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + MAIN_KEY;

export const SIGN_iN =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  MAIN_KEY;

const error_messages = {
  EMAIL_EXISTS: "Bu email malumotlar bazasida mavjud. Kirish qismiga o'ting",
  TOO_MANY_ATTEMPTS_TRY_LATER:
    "Juda ko'p urinish bo'ldi. Birozdan keyin harakat qiling",
  EMAIL_NOT_FOUND: "Bu turdagi email ma'lumotlar bazasida topilmadi",
  INVALID_PASSWORD: "Kirish paroli mos emas! Qaytadan harakat qiling",
};

export async function authActionApi(requestData, login = false) {
  const data = await fetch(login ? SIGN_iN : SIGN_UP, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    const { error } = await data.json();
    throw new Error(error_messages[error.message] || "Nimadir xato!");
  }
  const main_data = await data.json();

  return main_data;
}

export async function sendQuoteRequest(payload) {
  const data = await fetch(
    "https://quote-4ff3e-default-rtdb.firebaseio.com/quotes.json",
    {
      method: "POST",
      body: JSON.stringify(payload),

      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!data.ok) {
    const { error } = await data.json();
    throw new Error(error || "Nimadir xato!");
  }

  const main_data = await data.json();

  return main_data;
}

export async function getAllQuotes() {
  const data = await fetch(
    "https://quote-4ff3e-default-rtdb.firebaseio.com/quotes.json"
  );

  if (!data.ok) {
    const { error } = await data.json();
    throw new Error(error || "Nimadir xato!");
  }
  const main_data = await data.json();

  return Object.keys(main_data).map((item) => {
    return {
      id: item,
      text: main_data[item].text,
      author: main_data[item].author,
    };
  });
}

export const getSingleQuote = async (id) => {
  try {
    const { data } = await axios.get(
      `https://quote-4ff3e-default-rtdb.firebaseio.com/quotes/${id}.json`
    );

    return data;
  } catch (error) {
    return error;
  }
};
