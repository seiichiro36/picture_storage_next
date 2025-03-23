"use client"

import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Textarea } from '@/_components/ui/textarea';
import { useRouter } from 'next/navigation';
import { saveArtwork, uploadArtworkImage } from '@/firebase';
import { createServerParamsForMetadata } from 'next/dist/server/app-render/entry-base';
import { useAtom } from "jotai";
import { persistentEmailAtom } from '@/basic/atom';

const PostForm = () => {
  const router = useRouter()

  const [persistentAtom, setPersistentAtom] = useAtom(persistentEmailAtom);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    illustration: null,
    video: null
  });

  const [previews, setPreviews] = useState({
    illustration: null,
    video: null
  })

  useEffect(() => {
    return () => {
      // Cleanup URLs on unmount
      if (previews.illustration) URL.revokeObjectURL(previews.illustration);
      if (previews.video) URL.revokeObjectURL(previews.video);
    };
  }, []);



  const handleSubmit = (e: any) => {
    e.preventDefault();
    const tags_arr = formData.tags.split(",")
    const fileNameWithDate = `${persistentAtom}_${Date.now()}_${formData.illustration.name}`

    console.log(formData.title);
    console.log(formData.description);
    console.log(tags_arr);
    console.log(formData.illustration.name);

    saveArtwork({userId: persistentAtom, title: formData.title, description: formData.description, tags: tags_arr, imageUrl: fileNameWithDate})
    uploadArtworkImage(formData.illustration, persistentAtom, fileNameWithDate)

    router.push("/arts")
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Cleanup previous URL
      if (previews[type]) URL.revokeObjectURL(previews[type]);

      // Create new preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [type]: previewUrl }));
      setFormData(prev => ({ ...prev, [type]: file }));
    }

  };

  const clearTitle = () => {
    setFormData(prev => ({ ...prev, title: '' }));
  };

  return (
    <div className="max-w-4xl mt-10 mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className='flex justify-between'>
            <label className="block text-sm font-medium mb-2">タイトル</label>
            <Button
              variant="ghost"
              onClick={clearTitle}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-center text-sm font-medium mb-2">イラスト</label>
            <div className="border-2 border-dashed rounded-md p-4 h-64">
              {previews.illustration ? (
                <div className="h-full flex flex-col">
                  <img
                    src={previews.illustration}
                    alt="イラストプレビュー"
                    className="max-h-48 object-contain mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(previews.illustration);
                      setPreviews(prev => ({ ...prev, illustration: null }));
                      setFormData(prev => ({ ...prev, illustration: null }));
                    }}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    削除
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm">クリックしてイラストをアップロード</span>
                  <input
                    type="file"
                    name="illustration"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'illustration')}
                    className="hidden"
                    required
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-center text-sm font-medium mb-2">制作過程動画 (任意)</label>
            <div className="border-2 border-dashed rounded-md p-4 h-64">
              {previews.video ? (
                <div className="h-full flex flex-col">
                  <video
                    src={previews.video}
                    className="max-h-48 w-full"
                    controls
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(previews.video);
                      setPreviews(prev => ({ ...prev, video: null }));
                      setFormData(prev => ({ ...prev, video: null }));
                    }}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    削除
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm">クリックして動画をアップロード</span>
                  <input
                    type="file"
                    accept="video/*"
                    name="video"
                    onChange={(e) => handleFileChange(e, 'video')}
                    className="hidden"

                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">説明（任意）</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">タグ（カンマ区切り）</label>
          <Input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            className="w-full p-2 border rounded-md"
            placeholder="例: イラスト, デジタルアート, ファンタジー"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#3b5a9b] text-white py-2 px-4 hover:bg-[#1e3a78]"
        >
          投稿する
        </Button>
      </form>
    </div>
  );
};

export default PostForm;