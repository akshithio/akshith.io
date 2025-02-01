"use client";

import { usePosts } from "@/hooks/usePosts";
import { duplet } from "@/utils/fonts";
import { useEffect, useRef, useState } from "react";

export default function FilterSearch({
  children,
  onCategoryChange, // Prop to notify parent about category selection changes
}: {
  children: React.ReactNode;
  onCategoryChange: (selectedCategories: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<
    { id: number; label: string; checked: boolean }[]
  >([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { posts, isLoading, error } = usePosts();

  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      const categories = Array.from(
        new Set(posts.map((post) => post.category)),
      );

      // Set the initial selected categories to all available categories
      const categoryOptions = categories.map((category, index) => ({
        id: index + 1,
        label: category,
        checked: true,
      }));
      setOptions(categoryOptions);

      onCategoryChange(categories);
    }
  }, [posts, isLoading]);

  const toggleOption = (id: number) => {
    setOptions((prevOptions) => {
      const updatedOptions = prevOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option,
      );

      const selectedCategories = updatedOptions
        .filter((option) => option.checked)
        .map((option) => option.label);

      onCategoryChange(selectedCategories);

      return updatedOptions;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (error) {
    return <p className="text-red-500">Failed to load posts: {error}</p>;
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent rounded-full p-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
      </button>

      <div
        role="menu"
        className={`${
          duplet.className
        } absolute right-0 z-20 mt-2 w-56 transform rounded-md bg-[#ccc] p-2 text-sm font-semibold shadow-lg transition-all duration-200 ease-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {isLoading ? (
          <p className="text-center text-sm">Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={`flex items-center justify-center rounded-full px-2 py-[2px] text-xs text-aWhite transition-all duration-200 ${
                  option.checked ? "  bg-[#444]" : " bg-[#999]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        <div
          className="absolute left-[92.5%] top-[2px] h-3 w-3 -translate-x-1/2 -translate-y-[7px] rotate-45 bg-[#ccc]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
