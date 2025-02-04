'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";
import { Textarea } from "@/_components/ui/textarea";
import { Alert, AlertDescription } from "@/_components/ui/alert";
import { useAtom} from "jotai";
import { emailAtom } from '@/basic/atom'; 
import { useRouter } from 'next/navigation';

import { Checkbox } from "@/_components/ui/checkbox";
import { Badge } from "@/_components/ui/badge";


const ProfileSetup = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    statusMessage: '',
    profileImage: null
  });

  const [email] = useAtom(emailAtom);

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '名前は必須です';
    } else if (formData.name.length > 50) {
      newErrors.name = '名前は50文字以内で入力してください';
    }

    if (!formData.userId.trim()) {
      newErrors.userId = 'ユーザーIDは必須です';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.userId)) {
      newErrors.userId = 'ユーザーIDは3-20文字の半角英数字とアンダースコアのみ使用できます';
    }

    if (formData.statusMessage.length > 200) {
      newErrors.statusMessage = 'ステータスメッセージは200文字以内で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: 'ファイルサイズは5MB以下にしてください' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({ ...formData, profileImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('フォームデータ:', formData);
      // ここで実際のAPI送信処理を行う
    }
    router.push("/")
  };

  const handleBackPage = () => {
    router.push("/login")
  }

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const tags = [
    { id: "illustration", label: "イラスト" },
    { id: "character", label: "キャラクター" },
    { id: "background", label: "背景" },
    { id: "animation", label: "アニメーション" },
    { id: "concept-art", label: "コンセプトアート" },
    { id: "fan-art", label: "ファンアート" }
  ];

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div>
    <Button className='ml-20 p-3 rounded-md' onClick={() => handleBackPage()}>前に戻る</Button>
    <Card className="w-full max-w-lg mx-auto">

      {email}
      <CardHeader>
        <CardTitle className="text-2xl text-center">プロフィール設定</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="名前を入力"
            />
            {errors.name && (
              <Alert variant="destructive">
                <AlertDescription>{errors.name}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">ユーザーID</Label>
            <Input
              id="userId"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              placeholder="半角英数字とアンダースコア"
            />
            {errors.userId && (
              <Alert variant="destructive">
                <AlertDescription>{errors.userId}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="statusMessage">ステータスメッセージ</Label>
            <Textarea
              id="statusMessage"
              value={formData.statusMessage}
              onChange={(e) => setFormData({ ...formData, statusMessage: e.target.value })}
              placeholder="ステータスメッセージを入力"
            />
            {errors.statusMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errors.statusMessage}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">プロフィール画像</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="プレビュー"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
            {errors.profileImage && (
              <Alert variant="destructive">
                <AlertDescription>{errors.profileImage}</AlertDescription>
              </Alert>
            )}
          </div>

          <Label>タグを選択してください</Label>
          
          <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <div
            key={tag.id}
            className="flex items-center"
          >
            <Checkbox
              id={tag.id}
              checked={selectedTags.includes(tag.id)}
              onCheckedChange={() => toggleTag(tag.id)}
              className="hidden"
            />
            <Badge
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => toggleTag(tag.id)}
            >
              {tag.label}
            </Badge>
          </div>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            選択中のタグ: {selectedTags.length}個
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map(tagId => (
              <Badge key={tagId} variant="secondary">
                {tags.find(t => t.id === tagId)?.label}
              </Badge>
            ))}
          </div>
        </div>
      )}


          <Button type="submit" className="w-full" >
            登録する
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>

  );
};

export default ProfileSetup;