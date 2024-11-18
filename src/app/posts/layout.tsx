

const PostLayout =  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default PostLayout