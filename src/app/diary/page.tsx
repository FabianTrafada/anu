"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import Link from "next/link"; 
import React, { useEffect, useState } from "react";

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // State for search term
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch(`/api/diary?search=${search}&page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch diaries");

        const data = await res.json();
        setDiaries(data.diaries);
        setTotalPages(data.totalPages); // Set total pages from response
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, [search, page]); // Trigger fetch when search or page changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Navbar mode="sidebar" />
      <div className="ml-60 flex flex-col gap-5 p-4 w-full">
        <div className="flex justify-between items-center mt-5">
          <h2 className="text-black text-4xl font-semibold">Your diary</h2>
          {/* Button to go to Add Diary page */}
          <Link href="/diary/new">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
              Add Diary
            </Button>
          </Link>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search diaries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        
        {/* Display diaries */}
        {diaries.map((diary: any) => (
          <Card key={diary.id}>
            <CardHeader>
              <CardTitle>
                <h2 className="text-xl font-bold">{diary.title}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{diary.content}</p>
              <small className="text-gray-500">{new Date(diary.createdAt).toLocaleDateString()}</small>
            </CardContent>
          </Card>
        ))}
        
        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <button 
            disabled={page <= 1} 
            onClick={() => setPage(page - 1)} 
            className="p-2 border rounded"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            disabled={page >= totalPages} 
            onClick={() => setPage(page + 1)} 
            className="p-2 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diary;
