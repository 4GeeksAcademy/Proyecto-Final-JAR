import { stripeServicesFetchClientSecret } from "../services/stripeServices";
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";

//OJO con la variable de entorno, debe estar definida en el archivo .env
// VITE_STRIPE_PUBLIC debe ser la clave pública de Stripe
// stripePromise no se debe de crear dentro del componente, ya que se crearía en cada renderizado y daria error
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState();
    //usamos el useEffect para obtener el clientSecret una vez que el componente se monta
    useEffect(() => {
        //utilizamos el servicio stripeServices para obtener el clientSecret
        const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
        if (!selectedPlan) {
            console.error("No plan selected. Redirecting to pricing page.");
            window.location.href = '/pricing'; // Redirige a la página de precios si no hay plan seleccionado
            return;
        }
        stripeServicesFetchClientSecret(selectedPlan.stripe).then(secret => setClientSecret(secret));
    }, []);

    const options = { clientSecret };
    // Si no tenemos el clientSecret, mostramos un spinner
    return (
        <div id="checkout">
            {/* EmbeddedCheckoutProvider necesita la promesa de stripe y las opciones que es el clientSecret */}
            {clientSecret ?
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
                : <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            }
        </div>
    )
}

export default CheckoutForm