"use client";
import * as React from "react";
import jsonwebtoken from "jsonwebtoken";

type FormProps = {};

export default function Form(props: FormProps) {
  const [field1Private, setField1Private] = React.useState("");
  const [field2Public, setFieldPublic] = React.useState("");

  const data = { name: "Tester" }; // fake
  const { token, ok } = (() => {
    try {
      return {
        token: jsonwebtoken.sign(data, `${field1Private}`, {
          algorithm: "RS256",
          noTimestamp: true,
          header: {
            x5c: [field2Public],
          },
        }),
        ok: true,
      };
    } catch (err) {
      console.log({ err });
      if (err instanceof Error) {
        return {
          token: err.message ?? "Erro ao processar certificados",
          ok: false,
        };
      }
      return { token: "Erro ao processar certificados", ok: false };
    }
  })();

  return (
    <div className="w-80 z-50 mb-6 flex flex-col gap-2">
      <div>
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Certificado com chave privada RSA
        </label>
        <textarea
          onChange={(e) => setField1Private(e.target.value)}
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="default-input2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Certificado SSL ICP-Brasil PEM
        </label>
        <textarea
          onChange={(e) => setFieldPublic(e.target.value)}
          id="default-input2"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <p className={`truncate text-xs ${ok ? "text-green-500" : "text-red-500"}`}>{token}</p>
    </div>
  );
}
