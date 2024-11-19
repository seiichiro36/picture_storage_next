import Header from "@/components/Header";


const PostLayout =  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}

export default PostLayout