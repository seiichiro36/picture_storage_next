import Header from "@/_components/Header";


const PostLayout =  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <div className="fixed z-10 w-full">
       <Header />
      </div>
      <div className="pt-20">{children}</div>
    </div>
  )
}

export default PostLayout