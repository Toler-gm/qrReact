import tobey from "./assets/tobey.webp"
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {

  const [scantResult, setScanResult] = useState(null)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })

    scanner.render(succes, error)

    function succes(result) {
      scanner.clear();
      setScanResult(result)
    }

    function error(err) {
      console.warn(err)
    }
  })

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
              style={{ WebkitTextStroke: '1px black' }}
            >
              LOG IN
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl m-auto">
        <div className="flex md:flex-row flex-col items-center">
          <section className="w-full">
            <div className="flex gap-2 text-7xl font-extrabold justify-center">
              <div className="flex flex-col items-center">
                <span>08</span>
                <span className="text-sm">HOUR</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>11</span>
                <span className="text-sm">MIN</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>52</span>
                <span className="text-sm">SECOND</span>
              </div>
            </div>
            <div>
              {scantResult
                ? <div>Accedido: <a href={"http://" + scantResult}>{scantResult}</a></div>
                :
                <div id="reader"> </div>
              }
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="">Registre por DNI</label>
              <input className="py-2 px-3 border-zinc-600 border rounded" type="text" placeholder="Ingrese su DNI" />
            </div>
          </section>
          <section className="w-full">
            <div className="flex items-center justify-center gap-6">
              <div>
                <img className=" w-52 h-52 object-cover rounded-full" src={tobey} alt="" />
              </div>
              <div>
                <h2 className="text-4xl font-black w-96">JEAN MALLQUI CRHIS PACHO</h2>
                <div className="flex">
                  <p>Hora Entrada:</p>
                  <span className="font-bold">08:11:52</span>
                </div>
                <div className="flex">
                  <p>Estado:</p>
                  <span className="text-cyan-500 font-bold">Temprano</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}