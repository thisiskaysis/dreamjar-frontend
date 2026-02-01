async function postSignUp(credentials) {
    const url = `${import.meta.env.VITE_API_URL}/parents/`;


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
  let data;
  try {
    data = await response.json(); // get the JSON error object
  } catch {
    throw { non_field_errors: ["Error trying to sign up"] }; // fallback
  }

  // If backend sends field errors, throw the object
  if (data) {
    throw data; // this will be caught in your form
  }

  throw { non_field_errors: ["Error trying to sign up"] };
}

    return await response.json();
}

export default postSignUp;