'use client';

import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DiffViewer } from "@/components/DiffViewer";

export default function Project({ params }) {
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/files?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOldValue(data.text);
        setNewValue(data.text);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />
  }

  const onTextChange = (value) => {
    setNewValue(value);
  }

  return (
    <>
      <div>
        <ReactQuill theme="snow" value={newValue} modules={modules} onChange={onTextChange} />
      </div>
      <DiffViewer oldValue={oldValue} newValue={newValue} />
    </>
  )
}