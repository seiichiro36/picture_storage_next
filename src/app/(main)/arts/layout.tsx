import Header from "@/_components/Header";


const PostLayout =  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <Header />
      <div className="pt-20">{children}</div>
    </div>
  )
}

export default PostLayout