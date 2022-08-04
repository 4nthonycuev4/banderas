import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const AddCountryPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [short, setShort] = useState("");
  const [nationality, setNationality] = useState("");
  const [flag, setFlag] = useState("");
  const [colors, setColors] = useState("");

  const handleAddCountry = async () =>
    await fetch("/api/countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        short,
        nationality,
        flag,
        colors,
      }),
    }).then(() => router.push("/"));
  return (
    <>
      <Head>
        <title>Añadir País</title>
        <meta name="description" content="By Anthony Cueva" />
      </Head>
      <main className="flex items-center flex-col">
        <h1 className="font-bold text-3xl pb-4">Añadir país</h1>
        <div className="w-1/2 flex flex-col items-center space-y-2">
          <div className="flex justify-between items-center w-80">
            <label>Nombre: </label>
            <input
              type="text"
              className="form-input rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-80">
            <label>Short name: </label>
            <input
              type="text"
              className="form-input rounded"
              onChange={(e) => setShort(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-80">
            <label>Nacionalidad: </label>
            <input
              type="text"
              className="form-input rounded"
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-80">
            <label>Bandera: </label>
            <input
              type="text"
              className="form-input rounded"
              onChange={(e) => setFlag(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-80">
            <label>Colores: </label>
            <input
              type="text"
              className="form-input rounded"
              onChange={(e) => setColors(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border-blue-500 border-2 px-4 py-1 rounded hover:bg-blue-500 hover:text-white font-bold"
            onClick={handleAddCountry}
          >
            Añadir
          </button>
        </div>
      </main>
    </>
  );
};

export default AddCountryPage;
