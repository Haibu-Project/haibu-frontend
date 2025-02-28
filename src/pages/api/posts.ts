"use server"
import type { NextApiRequest, NextApiResponse } from "next";
import { Oracle } from "@chopinframework/next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      console.log("Llamando a GET /api/posts...");
      const response = await Oracle.fetch(`${API_URL}/api/posts`);
      if (!response.ok) throw new Error("Error al obtener posts");

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      console.log("Llamando a POST /api/posts...");
      const data = req.body;

      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        return res.status(response.status).json({ error: errorBody.error || "Error al crear post" });
      }

      const result = await response.json();
      return res.status(200).json(result);
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en /api/posts:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
