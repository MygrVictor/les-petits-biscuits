import { useCallback, useEffect, useRef, useState } from "react";

export const SESSION_KEY = "lpb-admin-token";

export const getToken = () => sessionStorage.getItem(SESSION_KEY) || "";

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401 && auth) {
    sessionStorage.removeItem(SESSION_KEY);
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Erreur ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

/**
 * Collection admin synchronisée avec la base.
 * Retourne [items, setItems, { loading, error, reload }] ;
 * setItems accepte une valeur ou un updater comme useState, puis
 * envoie les ajouts/modifications (PUT) et suppressions (DELETE) au serveur.
 */
export function useSyncedCollection(endpoint, enabled = true) {
  const [items, setLocal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const reload = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError("");
    try {
      const data = await api(endpoint, { auth: true });
      setLocal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, enabled]);

  useEffect(() => {
    reload();
  }, [reload]);

  const setItems = useCallback(
    (updater) => {
      const prev = itemsRef.current;
      const next = typeof updater === "function" ? updater(prev) : updater;
      itemsRef.current = next;
      setLocal(next);

      const prevById = new Map(prev.map((i) => [i.id, i]));
      const nextIds = new Set(next.map((i) => i.id));
      const ops = [];
      for (const item of next) {
        if (prevById.get(item.id) !== item) {
          ops.push(api(endpoint, { method: "PUT", body: item, auth: true }));
        }
      }
      for (const item of prev) {
        if (!nextIds.has(item.id)) {
          ops.push(
            api(`${endpoint}?id=${encodeURIComponent(item.id)}`, {
              method: "DELETE",
              auth: true,
            }),
          );
        }
      }
      if (ops.length) {
        Promise.all(ops).catch((err) => {
          setError(`Enregistrement impossible : ${err.message}`);
          reload(); // resynchronise avec la base
        });
      }
    },
    [endpoint, reload],
  );

  return [items, setItems, { loading, error, reload, setLocal }];
}
