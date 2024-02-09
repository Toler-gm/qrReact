import tobey from "./assets/tobey.webp";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
export default function App() {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const [userInformation, setUserInformation] = useState(null);


  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scannerRef.current.render(succes, error);

    function succes(result) {
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }

    function succes(result) {
      setScanResult(result);

      // Fetch data using Axios
      axios.get(`http://localhost:3000/students/${result}`)
        .then(response => {       
          const userData = response.data;
          setUserInformation(userData);
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }



    return () => {

    };

  }, []);



  return (
    <>
      <nav>
        <div className="flex max-w-7xl m-auto justify-between my-5">
          <div>
            <h1 className="text-2xl font-black">COLEGIO</h1>
          </div>
          <div className="flex gap-2">
            <button className="font-black text-2xl">REGISTER</button>
            <button
              className="font-black text-2xl text-transparent"
              style={{ WebkitTextStroke: "1px black" }}
            >
              LOG IN
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl m-auto">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4">
          <section className="w-full">
            <div className="flex gap-2 text-7xl font-extrabold justify-center">
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <span>{hours}</span>
                  <span className="text-sm">HOUR</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{minutes}</span>
                  <span className="text-sm">MIN</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{seconds}</span>
                  <span className="text-sm">SECOND</span>
                </div>
              </div>
            </div>
            <div>
              <div id="reader"></div>
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">
                Registre por DNI
              </label>
              <a href={"http://" + scanResult}>{scanResult}</a>
              <input
                className="py-2 px-3 border-zinc-600 border rounded"
                type="text"
                placeholder="Ingrese su DNI"
              />
            </div>
          </section>

          {/* section informacion */}

          <section className="w-full">
            {userInformation && (
              <div className="flex items-center justify-center gap-6">
                <div>
                  <img
                    className="w-52 h-52 object-cover rounded-full"
                    src={userInformation.public_id}
                    alt=""
                  />
                  
                </div>
                <div>
                  <h2 className="text-4xl font-black w-96">
                    {userInformation.vNombres}
                  </h2>
                  <h2 className="text-4xl font-black w-96">
                    {userInformation.vApellido_p}
                  </h2>
                  <h2 className="text-4xl font-black w-96">
                    {userInformation.vApellido_m}
                  </h2>
                  
                  {/* Other user information */}
                  <div className="flex">
                    <p>Estado:</p>
                    <span className="text-cyan-500 font-bold">
                      {userInformation.estado}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}
