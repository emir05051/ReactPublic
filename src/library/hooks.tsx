import React, { useEffect, useState } from "react";
import { SearchBooks } from "../types/types";

export function useAjax(
  url: string,
  method: string = "GET",
  auto: boolean = false
) {
  let [res, setRes] = useState<SearchBooks[]>();
  let [error, setError] = useState<string>();
  let [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!auto) {
      return;
    }
    setLoading(true);
    fetch(url, { method })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Error");
      })
      .then((res) => {
        setRes(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [method, url, auto]);
  console.log(res);

  return { res, error, loading };
}

export function useLocalStorage(key: string, defaultValue: string) {
  let [data, setData] = useState<any>(key);
  useEffect(() => {
    let item = localStorage.getItem(key);
    if (!item) {
      setData(defaultValue);
    }
    setData(item);
  }, [defaultValue, key]);
  return [
    data,
    (value: any) => {
      localStorage.setItem(key, value);
      setData(value);
    },
  ];
}
