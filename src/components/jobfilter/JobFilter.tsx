"use client";

import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface JobFilterProps {
    availableTags: string[]; // List of available tags
    filters: {
        jobTypes: string[];
        tags: string[];
    };
    onFilterChange: (key: "jobTypes" | "tags", value: string[] | string) => void;
}

export default function JobFilter({
  availableTags,
  filters,
  onFilterChange,
}: JobFilterProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTags = availableTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !filters.tags.includes(tag) // Exclude already selected tags
  );

  const addTag = (tag: string) => {
    const updatedTags = [...filters.tags, tag];
    onFilterChange("tags", updatedTags); // Notify parent of tag change
    setInputValue(""); // Clear the input
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => {
    const updatedTags = filters.tags.filter((t) => t !== tag);
    onFilterChange("tags", updatedTags); // Notify parent of tag removal
  };

  const toggleJobType = (type: string) => {
    const updatedJobTypes = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type];
    onFilterChange("jobTypes", updatedJobTypes); // Notify parent of job type change
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-[320px] bg-white rounded-lg p-4 gap-6">
      {/* Header */}
      <div className="w-full flex items-start justify-center">
        <p className="text-2xl font-semibold text-gray-800">Job Filters</p>
      </div>
  
      {/* Job Type Filter */}
      <div className="w-full flex flex-col items-start bg-gray-50 p-4 rounded-lg shadow-md">
        <p className="text-lg font-medium text-gray-700 mb-3">Job Type</p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="paid"
              checked={filters.jobTypes.includes("paid")}
              onCheckedChange={() => toggleJobType("paid")}
              className="w-4 h-4 accent-blue-500"
            />
            <label
              htmlFor="paid"
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition"
            >
              Paid
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="volunteer"
              checked={filters.jobTypes.includes("volunteer")}
              onCheckedChange={() => toggleJobType("volunteer")}
              className="w-4 h-4 accent-blue-500"
            />
            <label
              htmlFor="volunteer"
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition"
            >
              Volunteer
            </label>
          </div>
        </div>
      </div>
  
      {/* Tags Filter */}
      <div className="w-full flex flex-col items-start bg-gray-50 p-4 rounded-lg shadow-md">
        <p className="text-lg font-medium text-gray-700 mb-3">Tags</p>
  
        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.tags.length > 0 ? (
            filters.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800 transition"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No tags selected.</p>
          )}
        </div>
  
        {/* Add Tags Input */}
        <Button
          onClick={() => setIsInputVisible((prev) => !prev)}
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
        >
          {isInputVisible ? "Close" : "Add Tags"}
        </Button>
        {isInputVisible && (
          <div className="relative mt-3 w-full" ref={inputRef}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search tags"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {showSuggestions && filteredTags.length > 0 && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-40 overflow-y-auto z-10">
                {filteredTags.map((tag) => (
                  <div
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="cursor-pointer px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}  