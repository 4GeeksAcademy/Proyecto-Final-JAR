export const Footer = () => (
  <footer className="custom-footer footer-light py-3 text-center">
    <a href="https://www.instagram.com/stargig" target="_blank" rel="noopener noreferrer">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYklEQVR4nO2Zy04UQRSGe4GK4TouYauCcSGK7lTiTmIi+gSEiLyAF3QNsiUYlhJ8AS+JKxm87tS9gG4U3CoKiCv5TMlfsTKZ6a7u6Z4ek/mTSTrTVaf+03Xq3CoIGmggfwA9wDiwCCwBW6QHI8vILAI3gcNZKHASeEbtsQj0p6HAHmAW2JHgr8A94KJ2pyWVL7W7VotkDgFzWgutfRdoSiq4ADyXsJ/ABNCeFnGP9duBSWDb2Z3OJDthTemLMa3MGEdzOQZ8EpdXwN44k405GawCXZky9ePTBayJ00ycg70jczoe1AmAEzKz3+bZZ4I1qYmgzgDcEbdi1MAexzvV7GA761/QmTRmNFjmfQfwTRwPhQkywc5gLmvSFdZfc2LIaoUx83p/I0yQiaoGQ1kSrlKRy3q/ECZoRYMSpweKPyPAY2BZqceWnh/pXaHC3EEpY7zl+QjzXw4jsaFBbQkU2A/cBr57pB7rwC2gOcE6bZKxETboLxL6+XcO0afAqE1j9OvVfwvOuLdJ4hRRPJMoIiVW7XYDpz3mnHHMOHbQJW1FZE52J17EyYV0ll5q7ps4ZkYGipgzgeqIeAndP2XszoznoohI2IMdaU4hcgYcB1DIQ5ERe7Bj8I6KX8N5KGJigsGVGJwryboqWQ/yUMTadk8MzpVk9VqvF+SgyKaGt8bgXElWq2Rt/u+KmLLW4Ifn+IZphR320aBKAGN5HvaRyHTaE+qQ5OZ+CwpiBmdj8C6Vc04yjKzOmitSkqKs+EblMh/jQ2TFVwNFmpWKowTQWxngAPC6LpLGMmm8+boDgZ85faybNL5EGfNVLYryREcU7Fr1POYcbLsTmRRWG1WUus3qwlgHEIZ1XR3sy6rUXUmh+dBp3CjwUHXKpn5L+m84Se0St/mQazvIB047qHL5oO3OrUHnA+C+OF6r25ZpFLxbphpsvcpkUGcApiLNyhncr2uFba/2fY3A7nXHL10r9PlOMnd2qH3ZnTnLaD7dTl94Os7EJsfETJv/VKZMw7n0AZ+dQNuUJB5YZbZ1ydKRGePyB3tK5oRarcnij3ZmRnaJPIa5n7ikhkHVZa6zlkljehUn5h3vZNaeTnw9XbLIUeAJtUcxE4djfLepG7TNNv1IC0bWe3XyrwMHU1eggQaC2PgDcoKh50PBZGwAAAAASUVORK5CYII="
        alt="instagram-new--v1"
      />
    </a>
    <a href="https://twitter.com/stargig" target="_blank" rel="noopener noreferrer">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRUlEQVR4nO2ZXWiOYRjHn3343JjZ5gD5ykoRRVhq9iEHcmCbjxxQOHNEQ0uRsTii1Up2wMGc4ECGUg4UilI25LtIPiMfs9d85Ounm/9jN827+13teW/t/R+97/+5ruu+/j33fd3X/dxBkEIKKfQYwAigDrgCdBA9OoBWYAdQ0FMRS4AY/qAdqOqJiO8KcAwoAbKCiAFkAaVAs3L5BlQmMp3CN7Ep8ARAjXJ6C+S7ONSFbyLwDMAJ5bbdxfiqjEsCzwCUKbdWF+N3Ms4OPAMwRLnFXIx/IvAUuObXp4QA9d3U/FUJJDYcuCu/hqiFDACuxRFi1lmhw1j9gDPyOQVkRipEdpOBj9o4F1j8YYW4AGTE8U8DmmR7A8hJ2hoBNsr8KZAnbhjwUPyWOL5bZfMMGOMyXm8KSbemxu8NFJirduILMLsLv6V6kx+AWS5j9aoQ2Y8CXstttcXvEXfP3pOAmcB7Ca1wHafXhchnsdV2F1oFIewS9okbB7wQV53IGJEIkd9BuV4Mqw8wRQXBYCVwS78bE40fpZAc4IHct1n8ev7EaZcymzQh8i0GvmqRF1ll1iQfHo6cymxShch/l0LcN02euJHAK/Frexo7aiGZwCWF2W/xFeJMxZrkvRADk6gSNlhm8QfEtQD9g/9AyFirzL40U0t8tvYVg52+T62hwHWFeWNVqjQ9L1IxMEWh2NeqlQGcVIhzwGjguf6vs+xqxT0Ccn0Uslfut8METWesvuoTMNUqCGbjNGjySghQLVdTZif+9azRatcHiptgfXZa7oUQYKHmvGlH5nTxfDBwR6F3W/wacW2urTy9JQSYrmbRTJ8VcexmAJ/V9c6z+CPWmkpPihDt2I+7O0R1cZh6Yh3EcrXoDTZELkR7gvlKb3AoLK8OB7Gz8jlq8fOtgjAtMiEqs8dlet6cPboN3Ok7Xs3jv3ATGBSVkAarMUz43sJ8LiI+6iMRkkzQF4XEPP6IPVS5tbsYh5WoNPAMQLlya3ExNhePBs2BZ6CzIa11MS6wymNN4AmAzVY7k+fqVKVWAl13lSVjzfBr0y233oTJaVGiQSp18egL2hIWYYnJNxePOmOHV3JRIgZc1kHMbTqlkEIKQVf4AS4Y/ovQkay6AAAAAElFTkSuQmCC"
        alt="twitterx--v1"
      />
    </a>
    <a href="https://www.linkedin.com/company/stargig" target="_blank" rel="noopener noreferrer">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVElEQVR4nO2avWsUQRjGR6OCQT3T5aNIFbTQKiJobxWJldpa2KTPB1iIoNgoNvoX2IrYCYIXRAmIFlqJiFhEFJQQkigaUfOT93gCy3K7mdu9zc3i/Kq7532ZeZ+dj93bOecikUghgNNAE/hO7/mmWiY6NXGNcLnayUgY68A0MOR6DDAEzKgmvEYGmFfytAsMYFa1NX2SbT4agy4wgEHVtuaT3MIFCr71/RdGgBPAQ+AL8Bl4ABypouDKjGg3+9NmO/wJjLsaGXmtkN1jDgL7bE+X9riqwqswsqpQf0I7IG3V1cjIE4WuAw2ZuCLteVWFV2FkHPjRZo3Y3faYq9muNQbcBRaBT7XctUKBLkytBbJ55pMD7AbOA/eBj5qWK9oRbwKHt8NILj45wNst4r+BW8Cuyo3k6Z4X4Q1wERgF9gD7gZPAHeCXcmzt7QzRiN39N4DLWQUq7zjwVc3MhWjkLHAu8b0vp/9TasbWTiMoI4rZY81tYElp9tB5w6ZWm9xHypkKyog91gCvEuvkb+LzS+BvKv+CYvdCM3JJoXfAUduVtB4+SJ9N5R+S/j40I3bVjcmUfkb6i5TekL4SmpFlhQZS+oD05ZS+Q/pGaEYyOy/TXy7RiIsj0qLszHBlG0jqRTov018u0YiLI9Ki7MxwZRtI6kU6L9NfLls1kIVvTpF2u23EfnNn8dQ3p0i7XTUSCnRgZE25PT9ySwOMeL+i1empMeMCA5jr5OhtQsnrOrMb3pYq82salonNtyx+x9SJ44L6Hk+nRqaZOByt3x8GIpGI2+QfoCLUzPQjDtYAAAAASUVORK5CYII="
        alt="linkedin"
      />
    </a>
    <a href="https://www.facebook.com/stargig" target="_blank" rel="noopener noreferrer">
      <img
        width="50"
        height="50"
        src="https://img.icons8.com/ios/50/FFFFFF/facebook--v1.png"
        alt="facebook--v1"
      />
    </a>
    <a href="https://www.tiktok.com/@stargig" target="_blank" rel="noopener noreferrer">
      <img
        width="50"
        height="50"
        src="https://img.icons8.com/ios/50/FFFFFF/tiktok--v1.png"
        alt="tiktok--v1"
      />
    </a>
  </footer>
);
