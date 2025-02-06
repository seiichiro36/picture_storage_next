'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";
import { Textarea } from "@/_components/ui/textarea";
import { Alert, AlertDescription } from "@/_components/ui/alert";
import { emailAtom } from '@/basic/atom';
import { useRouter } from 'next/navigation';

import { Checkbox } from "@/_components/ui/checkbox";
import { Badge } from "@/_components/ui/badge";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/_components/ui/form';
import { log, profile } from 'console';
import { checkUserWhetherIsExist, createNewUser, uploadProfileImage } from '@/firebase';


const ProfileSetup = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format. Please provide a valid email address." })
      .min(1, { message: "Email is required." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(20, { message: "Password must not exceed 20 characters." })
      .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
      .regex(/\d/, { message: "Password must include at least one number." })
      .regex(/[@$!%*?&]/, { message: "Password must include at least one special character (@$!%*?&)." }),
    username: z
      .string(),
    userId: z
      .string(),
    bio: z.string()
  });

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    userId: '',
  });


  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  const [ProfileImage, setProfileImage] = useState<File|string>("");
  const [ProfileImageName, setProfileImageName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // タグ追加
  const toggleTag = (tagId: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tagId)
        ? prevTags.filter(id => id !== tagId) // クリックされたタグを削除
        : [...prevTags, tagId]; // クリックされたタグを追加

      console.log("選択中のタグ:", newTags);
      return newTags;
    });
  };


  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImageURL: 'ファイルサイズは5MB以下にしてください' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {

        setPreviewUrl(reader.result);
        console.log(reader.result);

        // uploadProfileImage(file, "test1");

        setFormData({ ...formData, profileImageURL: file });
      };
      reader.readAsDataURL(file);
    }
    setProfileImage(file);
    setProfileImageName(file.name);

  };


  const tags = [
    { id: "illustration", label: "イラスト" },
    { id: "character", label: "キャラクター" },
    { id: "background", label: "背景" },
    { id: "animation", label: "アニメーション" },
    { id: "concept-art", label: "コンセプトアート" },
    { id: "fan-art", label: "ファンアート" }
  ];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      userId: "",
      bio: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values.email, values.password);
    console.log(values.username, values.userId);
    console.log(values.bio);

    console.log(selectedTags);
    // console.log(ProfileImage);

    const result: boolean = (await checkUserWhetherIsExist({ email: values.email, password: values.password})).exists
    if (result === true) {
      console.log("そのメールアドレスは既に登録されています");
    } else {
      console.log("そのメールアドレスは使用されていません");

      await createNewUser({ email: values.email, password: values.password, username: values.username, userId: values.userId, bio: values.bio, tags: selectedTags, ProfileImageName: ProfileImageName})
      await uploadProfileImage(ProfileImage, values.email);

      router.push("/arts")
    }
  }


  return (
    <div>
      <Button
        className='p-3 rounded-md bg-[#3b5a9b] hover:bg-[#1e3a78]'
        onClick={() => router.push("/login")}
      >
        前に戻る
      </Button>

      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">プロフィール設定</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="hogehoge@hoge.hoge" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input placeholder="HogehogE" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>

                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名前</FormLabel>
                    <FormControl>
                      <Input placeholder="名前を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザーID</FormLabel>
                    <FormControl>
                      <Input placeholder="半角英数字とアンダースコア" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ステータスメッセージ</FormLabel>
                    <FormControl>
                      <Textarea placeholder="ステータスメッセージを入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              </div>

              <div>
                <Label>タグを選択してください</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <div key={tag.id} className="flex items-center">
                      <Checkbox
                        id={tag.id}
                        checked={selectedTags.includes(tag.id)}
                        onCheckedChange={() => toggleTag(tag.id)}
                        className="hidden"
                      />
                      <Badge
                        variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                        // className={`cursor-pointer hover:bg-primary/90  ${selectedTags.includes(tag.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600}`}
                        className={`cursor-pointer hover:bg-primary/90 transition-colors px-3 py-1 rounded-md
                            ${selectedTags.includes(tag.id) ? "bg-[#3b5a9b] text-white" : "bg-gray-200 text-gray-600"}`}
                        onClick={() => toggleTag(tag.id)}
                      >
                        {tag.label}
                      </Badge>
                    </div>
                  ))}
                </div>
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

              <Button type="submit" className="w-full bg-[#3b5a9b] hover:bg-[#1e3a78]">
                登録する
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  );
};

export default ProfileSetup;