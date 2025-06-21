const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const stripeServicesPlans = async () => {
    try {
        const response = await fetch(`${backendUrl}/api/plans`);
        if (!response.ok) {
        throw new Error('Error fetching plans');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
    }



export const stripeServicesFetchClientSecret = async (id) => {
  /*
     Create a Checkout Session
    le vamos a pasar los items que son los productos que se van a comprar
    los itemns son un array de objetos con la siguiente estructura:
    [ 
    {price: "price_1RWvuTA9wzTLXCekBvIVg8Zh", quantity: 1},
    etc...
    ]

    el price es el id del PRECIO del PRODUCTO que se va a comprar, el ID lo da stripe al crear el producto
    para facilitar obtener el id del PRECIO, puedes almacenarlo en la base de datos
    como no tenemos una base de datos, lo vamos poner directamente en el código para probarlo
    se pueden pasar tantos items como se quiera, pero hay que tener en cuenta que el ID del PRECIO del producto
    stripe se ocupa de mostrar el total de la compra y todo lo necesario para que el usuario pueda pagar
    */
  const items = [{price: id, quantity: 1}]
  console.log("items", items);
  
  const res = await fetch(backendUrl + "/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ items}),
  });

  const data = await res.json();

  return data.clientSecret;
};

export const stripeServicesfetchSessionStatus = async (sessionId, id) => {
  return fetch(backendUrl + `/api/session-status?session_id=${sessionId}`)
    .then((res) => res.json())
    .then((data) => stripeServicesUpdateDB(id).then(() => data));
};

const stripeServicesUpdateDB = async (id) => {
    return fetch(backendUrl + `/api/stripe-update-db`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ plan_id: id }),
    })
        .then((res) => res.json())
        .then((data) => data);
    }   
